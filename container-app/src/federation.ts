import { init } from '@module-federation/enhanced/runtime';
import React from 'react';
import ReactDOM from "react-dom";



/**
 * Initialize remote modules at runtime.
 * This must happen BEFORE you do any dynamic import('remoteApp/...').
 */
init({
    name: "host",
    remotes: [
        {
            name: "remote1",
            // entry: "/remotes/remote1/remoteEntry.js", // build
            entry: import.meta.env.VITE_REMOTE1_URL,
            type: "module"
        },
        {
            name: "remote2",
            // entry: "/remotes/remote2/remoteEntry.js", // build
            entry: import.meta.env.VITE_REMOTE2_URL,
            type: "module"
        },
    ],
    shared: {
      react: {
        version: "18.2.0",
        scope: "default",
        lib: () => React,
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.2.0",
        },
      },
      "react-dom": {
        version: "18.2.0",
        scope: "default",
        lib: () => ReactDOM,
        shareConfig: {
          singleton: true,
          requiredVersion: "^18.2.0",
        },
      },
    
    },
  });
  