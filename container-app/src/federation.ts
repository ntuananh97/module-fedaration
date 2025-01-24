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
            name: "remote",
            entry: "http://localhost:5001/remoteEntry.js",
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
  