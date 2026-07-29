/**
 * Виджет pasteImage — Ctrl+V, ссылка, drag-and-drop, выбор файла.
 * Локально: npm run cms:dev. На GitHub Pages: GitHub API + прямые ссылки.
 */
(function () {
  if (typeof CMS === 'undefined' || typeof createClass === 'undefined' || typeof h === 'undefined') {
    console.error('paste-image.js: Decap CMS не загружен');
    return;
  }

  var MEDIA_FOLDER = 'public/images/uploads';
  var PUBLIC_FOLDER = '/images/uploads';
  var LOCAL_PROXY_URL = 'http://localhost:8082/upload';
  var LOCAL_IMAGE_PROXY_URL = 'http://localhost:8082/fetch-image';
  var REMOTE_IMAGE_PROXY_URL = 'https://coruscating-belekoy-b3081d.netlify.app/fetch-image';
  var DEFAULT_REPO = 'Nomina08/Kizhinga';
  var DEFAULT_BRANCH = 'main';

  var SITE_BASE = (function () {
    var match = window.location.pathname.match(/^(\/[^/]+)\/admin/);
    return match ? match[1] : '';
  })();

  function isLocalHost() {
    var host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
  }

  function getRepoConfig() {
    try {
      var config = CMS.getConfig && CMS.getConfig();
      if (config && config.backend && config.backend.repo) {
        return {
          repo: config.backend.repo,
          branch: config.backend.branch || DEFAULT_BRANCH,
        };
      }
    } catch (e) {}
    return { repo: DEFAULT_REPO, branch: DEFAULT_BRANCH };
  }

  function resolvePreviewUrl(path) {
    if (!path || typeof path !== 'string') return '';
    if (/^https?:\/\//i.test(path)) return path;
    if (path.charAt(0) === '/' && SITE_BASE && path.indexOf(SITE_BASE + '/') !== 0) {
      return SITE_BASE + path;
    }
    return path;
  }

  function normalizeFile(file) {
    if (!file) return null;
    var type = file.type || 'image/png';
    if (type.indexOf('image/') !== 0 && type.indexOf('video/') !== 0) return null;
    var name = file.name;
    if (!name || name === 'blob' || name === 'image.png') {
      var ext = type.split('/')[1] || 'png';
      if (ext === 'jpeg') ext = 'jpg';
      name = 'paste-' + Date.now() + '.' + ext;
      return new File([file], name, { type: type });
    }
    return file;
  }

  function toPublicPath(repoPath) {
    if (!repoPath) return '';
    var normalized = String(repoPath).replace(/\\/g, '/');
    if (normalized.indexOf('public/') === 0) {
      return normalized.replace(/^public/, '');
    }
    if (normalized.charAt(0) === '/') return normalized;
    return PUBLIC_FOLDER + '/' + normalized.split('/').pop();
  }

  function sanitizePublicPath(path) {
    if (!path || typeof path !== 'string') return '';
    if (path.indexOf('[object Object]') !== -1) return '';
    return path.trim();
  }

  function getGithubTokenAsync() {
    return new Promise(function (resolve) {
      try {
        var stored = localStorage.getItem('decap-cms-user');
        if (stored) {
          var user = JSON.parse(stored);
          if (user && typeof user.token === 'string' && user.token.length > 10) {
            resolve(user.token);
            return;
          }
        }
      } catch (e) {}

      try {
        if (window.CMS && typeof window.CMS.getBackend === 'function') {
          var backend = window.CMS.getBackend();
          if (backend && typeof backend.getToken === 'function') {
            var token = backend.getToken();
            if (token && typeof token.then === 'function') {
              token
                .then(function (t) {
                  resolve(typeof t === 'string' && t.length > 10 ? t : null);
                })
                .catch(function () {
                  resolve(null);
                });
              return;
            }
            if (typeof token === 'string' && token.length > 10) {
              resolve(token);
              return;
            }
          }
        }
      } catch (e) {}

      resolve(null);
    });
  }

  function buildRepoPath(file) {
    var safeName = (file.name || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
    return MEDIA_FOLDER + '/' + Date.now() + '-' + safeName;
  }

  function uploadViaLocalProxy(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var base64 = String(reader.result).split(',')[1];
        var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

        fetch(LOCAL_PROXY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: safeName,
            content: base64,
            contentType: file.type || 'image/jpeg',
          }),
        })
          .then(function (response) {
            return response.json().then(function (data) {
              if (!response.ok || data.error) {
                throw new Error(data.error || 'proxy error');
              }
              resolve(sanitizePublicPath(data.path || toPublicPath(buildRepoPath(file))));
            });
          })
          .catch(reject);
      };
      reader.onerror = function () {
        reject(new Error('Не удалось прочитать файл'));
      };
      reader.readAsDataURL(file);
    });
  }

  function uploadViaGitHubAsync(file) {
    return getGithubTokenAsync().then(function (token) {
      if (!token) {
        throw new Error('Войдите через GitHub в админке (кнопка сверху)');
      }

      var repoConfig = getRepoConfig();
      var repoPath = buildRepoPath(file);

      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          var base64 = String(reader.result).split(',')[1];

          fetch('https://api.github.com/repos/' + repoConfig.repo + '/contents/' + repoPath, {
            method: 'PUT',
            headers: {
              Authorization: 'Bearer ' + token,
              Accept: 'application/vnd.github+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: 'Upload ' + file.name,
              content: base64,
              branch: repoConfig.branch,
            }),
          })
            .then(function (response) {
              return response.json().then(function (data) {
                if (!response.ok || !data.content) {
                  throw new Error(data.message || 'Не удалось загрузить на GitHub');
                }
                resolve(toPublicPath(repoPath));
              });
            })
            .catch(reject);
        };
        reader.onerror = function () {
          reject(new Error('Не удалось прочитать файл'));
        };
        reader.readAsDataURL(file);
      });
    });
  }

  function uploadViaCms(file, onAddAsset) {
    if (!onAddAsset) {
      return Promise.reject(new Error('CMS media upload unavailable'));
    }

    var safeName = (file.name || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
    var finalName = Date.now() + '-' + safeName;
    var uploadFile =
      file.name === finalName ? file : new File([file], finalName, { type: file.type || 'image/jpeg' });
    var expectedPath = PUBLIC_FOLDER + '/' + finalName;

    return Promise.resolve(onAddAsset(uploadFile)).then(function () {
      return expectedPath;
    });
  }

  function runUploadChain(file, onAddAsset) {
    if (isLocalHost()) {
      return uploadViaLocalProxy(file).catch(function () {
        if (onAddAsset) return uploadViaCms(file, onAddAsset);
        return uploadViaGitHubAsync(file);
      });
    }

    return uploadViaGitHubAsync(file).catch(function (githubErr) {
      if (onAddAsset) {
        return uploadViaCms(file, onAddAsset).catch(function () {
          throw githubErr;
        });
      }
      throw githubErr;
    });
  }

  function uploadFromUrlViaServer(url, onAddAsset) {
    var endpoint = isLocalHost() ? LOCAL_IMAGE_PROXY_URL : REMOTE_IMAGE_PROXY_URL;

    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok || data.error) {
          throw new Error(data.error || 'download failed');
        }

        if (data.path) return sanitizePublicPath(data.path);

        var binary = atob(data.base64);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        var blob = new Blob([bytes], { type: data.contentType || 'image/jpeg' });
        var file = new File([blob], data.filename || 'web-' + Date.now() + '.jpg', {
          type: data.contentType || 'image/jpeg',
        });
        return runUploadChain(file, onAddAsset);
      });
    });
  }

  function uploadFromUrl(url, onAddAsset) {
    var trimmed = (url || '').trim();
    if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
      return Promise.reject(new Error('Вставьте ссылку, начинающуюся с http:// или https://'));
    }

    if (isLocalHost()) {
      return uploadFromUrlViaServer(trimmed, onAddAsset);
    }

    return uploadFromUrlViaServer(trimmed, onAddAsset).catch(function () {
      return trimmed;
    });
  }

  function extractImageUrlFromHtml(html) {
    if (!html) return null;
    var match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  }

  var PasteImageControl = createClass({
    getInitialState: function () {
      return { uploading: false, error: null, dragOver: false, urlInput: '', zoneFocused: false };
    },

    componentDidMount: function () {
      var self = this;
      this._docPaste = function (e) {
        if (!self.state.zoneFocused) return;
        self.handlePaste(e);
      };
      document.addEventListener('paste', this._docPaste);
    },

    componentWillUnmount: function () {
      document.removeEventListener('paste', this._docPaste);
    },

    getDisplayUrl: function (value) {
      if (!value) return '';
      if (this.props.getAsset) {
        try {
          var asset = this.props.getAsset(value, this.props.field);
          if (asset) {
            if (typeof asset.toString === 'function') {
              var s = asset.toString();
              if (s && s.indexOf('[object') === -1) return resolvePreviewUrl(s);
            }
            if (asset.url) return resolvePreviewUrl(String(asset.url));
          }
        } catch (e) {}
      }
      return resolvePreviewUrl(value);
    },

    setPath: function (path) {
      var safePath = sanitizePublicPath(path);
      if (!safePath) {
        this.setError('Не удалось сохранить фото. Войдите через GitHub и попробуйте «Выбрать файл» или Ctrl+V.');
        return;
      }
      this.props.onChange(safePath);
      this.setState({ uploading: false, urlInput: '', error: null });
    },

    setError: function (message) {
      this.setState({ uploading: false, error: message });
    },

    uploadFile: function (rawFile) {
      var self = this;
      var file = normalizeFile(rawFile);
      if (!file) {
        this.setError('Можно загружать изображения (JPG, PNG, WebP…) и видео (MP4, WebM…)');
        return;
      }

      this.setState({ uploading: true, error: null });

      runUploadChain(file, this.props.onAddAsset)
        .then(function (path) {
          self.setPath(path);
        })
        .catch(function (err) {
          if (isLocalHost()) {
            self.setError(
              err && err.message
                ? err.message
                : 'Не удалось загрузить. Запустите: npm run cms:dev'
            );
          } else {
            self.setError(
              err && err.message
                ? err.message
                : 'Не удалось загрузить. Нажмите «Войти через GitHub» и повторите.'
            );
          }
        });
    },

    uploadFromUrlHandler: function (url) {
      var self = this;
      if (!url) return;

      this.setState({ uploading: true, error: null });

      uploadFromUrl(url, this.props.onAddAsset)
        .then(function (path) {
          self.setPath(path);
        })
        .catch(function (err) {
          self.setError(
            err && err.message
              ? err.message
              : 'Не удалось загрузить по ссылке. Скопируйте само изображение (Ctrl+V) или выберите файл.'
          );
        });
    },

    handlePaste: function (e) {
      var cd = e.clipboardData;
      if (!cd) return;

      var items = cd.items;
      if (items) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].kind === 'file') {
            var file = items[i].getAsFile();
            if (file && (file.type.indexOf('image/') === 0 || items[i].type.indexOf('image/') === 0)) {
              e.preventDefault();
              this.uploadFile(file);
              return;
            }
          }
        }
      }

      var htmlUrl = extractImageUrlFromHtml(cd.getData('text/html'));
      if (htmlUrl) {
        e.preventDefault();
        this.uploadFromUrlHandler(htmlUrl);
        return;
      }

      var text = (cd.getData('text/plain') || '').trim();
      if (text && /^https?:\/\//i.test(text)) {
        e.preventDefault();
        this.uploadFromUrlHandler(text);
      }
    },

    handleDrop: function (e) {
      e.preventDefault();
      this.setState({ dragOver: false });
      var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) this.uploadFile(file);
    },

    handleDragOver: function (e) {
      e.preventDefault();
      this.setState({ dragOver: true });
    },

    handleDragLeave: function () {
      this.setState({ dragOver: false });
    },

    handleFileInput: function (e) {
      e.stopPropagation();
      var file = e.target.files && e.target.files[0];
      if (file) this.uploadFile(file);
      e.target.value = '';
    },

    handlePickFile: function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (this._fileInput) this._fileInput.click();
    },

    handleUrlChange: function (e) {
      this.setState({ urlInput: e.target.value, error: null });
    },

    handleUrlSubmit: function (e) {
      e.preventDefault();
      this.uploadFromUrlHandler(this.state.urlInput.trim());
    },

    clearImage: function () {
      this.props.onChange('');
      this.setState({ error: null, urlInput: '' });
    },

    focusZone: function (e) {
      e.currentTarget.focus();
      this.setState({ zoneFocused: true });
    },

    blurZone: function () {
      this.setState({ zoneFocused: false });
    },

    render: function () {
      var value = this.props.value;
      var uploading = this.state.uploading;
      var error = this.state.error;
      var dragOver = this.state.dragOver;
      var local = isLocalHost();
      var previewUrl = this.getDisplayUrl(value);
      var self = this;

      return h(
        'div',
        { className: this.props.classNameWrapper },
        h(
          'div',
          {
            className: 'paste-image-zone' + (dragOver ? ' paste-image-zone--active' : ''),
            onPaste: this.handlePaste,
            onDrop: this.handleDrop,
            onDragOver: this.handleDragOver,
            onDragLeave: this.handleDragLeave,
            onClick: this.focusZone,
            onFocus: this.focusZone,
            onBlur: this.blurZone,
            tabIndex: 0,
          },
          previewUrl
            ? h('img', { className: 'paste-image-preview', src: previewUrl, alt: '' })
            : h(
                'div',
                { className: 'paste-image-placeholder' },
                h('strong', {}, '1. ПКМ по фото → «Копировать изображение»'),
                h('br'),
                h('strong', {}, '2. Кликните сюда → Ctrl+V')
              ),
          h(
            'p',
            { className: 'paste-image-hint' },
            uploading ? 'Загрузка…' : 'Ctrl+V · перетащить · выбрать файл · ссылка ниже'
          ),
          h('input', {
            ref: function (el) {
              self._fileInput = el;
            },
            type: 'file',
            accept: 'image/*,video/*',
            className: 'paste-image-file',
            style: { display: 'none' },
            onChange: this.handleFileInput,
            disabled: uploading,
          }),
          h(
            'button',
            {
              type: 'button',
              className: 'paste-image-url-btn',
              style: { marginTop: '10px' },
              onClick: this.handlePickFile,
              disabled: uploading,
            },
            'Выбрать файл'
          )
        ),
        h(
          'form',
          { className: 'paste-image-url-form', onSubmit: this.handleUrlSubmit },
          h('input', {
            type: 'url',
            className: 'paste-image-url-input',
            placeholder: 'https://site.ru/photo.jpg',
            value: this.state.urlInput,
            onChange: this.handleUrlChange,
            disabled: uploading,
          }),
          h(
            'button',
            {
              type: 'submit',
              className: 'paste-image-url-btn',
              disabled: uploading || !this.state.urlInput,
            },
            'Использовать ссылку'
          )
        ),
        value
          ? h(
              'button',
              {
                type: 'button',
                className: 'paste-image-clear',
                onClick: this.clearImage,
                disabled: uploading,
              },
              'Удалить фото'
            )
          : null,
        error ? h('p', { className: 'paste-image-error' }, error) : null,
        !error && local
          ? h('p', { className: 'paste-image-hint' }, 'Локально: npm run cms:dev в отдельном терминале')
          : null,
        !error && !local
          ? h(
              'p',
              { className: 'paste-image-hint' },
              'После загрузки нажмите Publish. По ссылке фото сохранится как URL (работает на сайте).'
            )
          : null
      );
    },
  });

  CMS.registerWidget('pasteImage', PasteImageControl);
})();
