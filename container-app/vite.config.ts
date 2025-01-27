import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { federation } from '@module-federation/vite';
// import { mf } from '@module-federation/enhanced';
// import { dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    
    // federation({
    //   name: "host",
    //   remotes: {
    //     remote: {
    //       type: "module",
    //       name: "remote",
    //       entry: "http://localhost:5001/remoteEntry.js",
    //       entryGlobalName: "remote",
    //       shareScope: "default",
    //     },
    //   },
    //   exposes: {},
		// 	filename: 'remoteEntry.js',
    //   shared: {
    //     react: { singleton: true, requiredVersion: dependencies.react },
    //     "react-dom": { singleton: true, requiredVersion: dependencies['react-dom'] },
    //   },
    // }),
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    minify: false,
  },
})
