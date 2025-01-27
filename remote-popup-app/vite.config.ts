import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite';
import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: "remote1",
    filename: "remoteEntry.js",
    exposes: {
      "./remote-app": "./src/NewTaskPopup.tsx",
      "./RemoteApp": "./src/RemoteApp.tsx",
    },
    shared: {
      react: { singleton: true, requiredVersion: dependencies.react },
      "react-dom": { singleton: true, requiredVersion: dependencies['react-dom'] },
    },
    remotes: {},
  }),

  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    minify: false,
  },
  server: {
    port: 5001 // container port
  }
})
