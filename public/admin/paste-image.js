/**
 * Виджет pasteImage — вставка фото из интернета (Ctrl+V), по ссылке, drag-and-drop.
 * Локально: npm run cms:dev. На сайте: загрузка через GitHub API после входа.
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

  function assetPath(asset) {
    if (!asset) return '';
    if (typeof asset === 'string') return asset;
    if (asset.get && asset.get('path')) return asset.get('path');
    if (asset.path) return asset.path;
    if (asset.toString) return asset.toString();
    return '';
  }

  function buildRepoPath(file) {
    var safeName = (file.name || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
    return MEDIA_FOLDER + '/' + Date.now() + '-' + safeName;
  }

  function getGithubToken() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        try {
          var raw = localStorage.getItem(key);
          if (!raw || raw.charAt(0) !== '{') continue;
          var data = JSON.parse(raw);
          if (data && typeof data.token === 'string' && data.token.length > 10) {
            return data.token;
          }
          if (data && typeof data.access_token === 'string' && data.access_token.length > 10) {
            return data.access_token;
          }
        } catch (e) {}
      }
    } catch (e) {}
    return null;
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
              resolve(data.path || toPublicPath(buildRepoPath(file)));
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

  function uploadViaGitHub(file) {
    return new Promise(function (resolve, reject) {
      var token = getGithubToken();
      if (!token) {
        reject(new Error('Войдите через GitHub в админке'));
        return;
      }

      var repoConfig = getRepoConfig();
      var repoPath = buildRepoPath(file);
      var reader = new FileReader();

      reader.onload = function () {
        var base64 = String(reader.result).split(',')[1];

        fetch(
          'https://api.github.com/repos/' + repoConfig.repo + '/contents/' + repoPath,
          {
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
          }
        )
          .then(function (response) {
            return response.json().then(function (data) {
              if (!response.ok || !data.content) {
                throw new Error(data.message || 'GitHub upload failed');
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
  }

  function uploadViaCms(file, onAddAsset) {
    if (!onAddAsset) {
      return Promise.reject(new Error('CMS media upload unavailable'));
    }

    var safeName = (file.name || 'image.jpg').replace(/[^a-zA-Z0-9._-]/g, '_');
    var finalName = Date.now() + '-' + safeName;
    var uploadFile =
      file.name === finalName
        ? file
        : new File([file], finalName, { type: file.type || 'image/jpeg' });

    return Promise.resolve(onAddAsset(uploadFile)).then(function (asset) {
      var path = assetPath(asset);
      if (path) return toPublicPath(path);
      return PUBLIC_FOLDER + '/' + finalName;
    });
  }

  function runUploadChain(file, onAddAsset) {
    if (isLocalHost()) {
      var attempt = uploadViaLocalProxy(file);
      if (onAddAsset) {
        attempt = attempt.catch(function () {
          return uploadViaCms(file, onAddAsset);
        });
      }
      return attempt;
    }

    var remoteAttempt = uploadViaGitHub(file);
    if (onAddAsset) {
      remoteAttempt = remoteAttempt.catch(function () {
        return uploadViaCms(file, onAddAsset);
      });
    }
    return remoteAttempt;
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

        if (data.path) return data.path;

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

    setPath: function (path) {
      this.props.onChange(path);
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

      var onAddAsset = this.props.onAddAsset;
      var attempt = runUploadChain(file, onAddAsset);

      attempt
        .then(function (path) {
          self.setPath(path);
        })
        .catch(function (err) {
          if (isLocalHost()) {
            self.setError(
              err && err.message
                ? err.message
                : 'Не удалось загрузить. Запустите: npm run cms:dev (в отдельном терминале)'
            );
          } else {
            self.setError(
              err && err.message
                ? err.message
                : 'Не удалось загрузить. Проверьте вход через GitHub и попробуйте «Выбрать файл».'
            );
          }
        });
    },

    uploadFromUrl: function (url) {
      var self = this;
      if (!url) return;

      this.setState({ uploading: true, error: null });

      uploadFromUrlViaServer(url, this.props.onAddAsset)
        .then(function (path) {
          self.setPath(path);
        })
        .catch(function (err) {
          if (isLocalHost()) {
            self.setError(
              err && err.message
                ? err.message
                : 'Не удалось скачать по ссылке. Запустите: npm run cms:dev'
            );
          } else {
            self.setError(
              'Не удалось скачать по ссылке. Скопируйте само изображение: ПКМ → «Копировать изображение» → Ctrl+V.'
            );
          }
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
        this.uploadFromUrl(htmlUrl);
        return;
      }

      var text = (cd.getData('text/plain') || '').trim();
      if (text && /^https?:\/\//i.test(text)) {
        e.preventDefault();
        this.uploadFromUrl(text);
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
      var file = e.target.files && e.target.files[0];
      if (file) this.uploadFile(file);
      e.target.value = '';
    },

    handleUrlChange: function (e) {
      this.setState({ urlInput: e.target.value, error: null });
    },

    handleUrlSubmit: function (e) {
      e.preventDefault();
      this.uploadFromUrl(this.state.urlInput.trim());
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
          value
            ? h('img', { className: 'paste-image-preview', src: value, alt: '' })
            : h(
                'div',
                { className: 'paste-image-placeholder' },
                h('strong', {}, '1. ПКМ по фото в интернете → «Копировать изображение»'),
                h('br'),
                h('strong', {}, '2. Кликните сюда → Ctrl+V')
              ),
          h(
            'p',
            { className: 'paste-image-hint' },
            uploading ? 'Загрузка…' : 'Фото, видео MP4, ссылка ниже · или выберите файл'
          ),
          h('input', {
            type: 'file',
            accept: 'image/*,video/*',
            className: 'paste-image-file',
            onChange: this.handleFileInput,
            disabled: uploading,
          })
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
            'Загрузить по ссылке'
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
          ? h(
              'p',
              { className: 'paste-image-hint' },
              'Локально нужен терминал: npm run cms:dev'
            )
          : null
      );
    },
  });

  CMS.registerWidget('pasteImage', PasteImageControl);
})();
