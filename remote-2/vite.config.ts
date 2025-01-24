import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    federation({
      name: 'remote2',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/RemoteApp.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
      },
    })
  ],
  server: {
    port: 5002 // container port
  }
})
