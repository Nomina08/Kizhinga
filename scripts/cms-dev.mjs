import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(label, command, args, env) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, ...env },
  });
  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`${label} exited with code ${code}`);
    }
  });
  return child;
}

console.log('Starting CMS local backend + image proxy…');
console.log('  decap-server  → http://localhost:8081');
console.log('  image proxy   → http://localhost:8082');

const decap = run('decap-server', 'npx', ['decap-server'], { MODE: 'fs' });
const images = run('image-proxy', 'node', ['scripts/cms-image-proxy.mjs']);

function shutdown() {
  decap.kill('SIGTERM');
  images.kill('SIGTERM');
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
