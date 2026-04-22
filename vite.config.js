import { defineConfig } from 'vite';
import * as fs from 'node:fs/promises';
import react from '@vitejs/plugin-react';

export default defineConfig( userConfigFn );

async function userConfigFn()
{
  return {
    plugins: [
      react(),
    ],
    build: {
      target: [ 'chrome140' ],
      sourcemap: true,
    },
    server: {
      https: {
        key: await fs.readFile('./certificate/localhost-key.pem'),
        cert: await fs.readFile('./certificate/localhost.pem'),
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8082',
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  };
}