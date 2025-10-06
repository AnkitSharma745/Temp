// Node.js path utility to resolve absolute paths
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';
// Importing config and plugin helpers from electron-vite
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

// React plugin for Vite — adds support for JSX, Fast Refresh, etc.
import react from '@vitejs/plugin-react';

// Export the Electron-Vite configuration
export default defineConfig({
  // Main process (Electron's background process)
  main: {
    // This plugin tells Vite not to bundle external Node modules — improves build speed and avoids duplication
    plugins: [externalizeDepsPlugin()]
  },

  // Preload script configuration (executed before renderer in Electron context)
  preload: {
    // Same externalization plugin used here to keep node_modules out of the bundle
    plugins: [externalizeDepsPlugin()]
  },

  // Renderer process (your React frontend)
  renderer: {
    resolve: {
      alias: {
        // Create an alias so you can import like: import X from '@renderer/...'
        '@': resolve('src/renderer/src')
      }
    },
    // Use the React plugin to handle .jsx/.tsx files, Fast Refresh, etc.
    plugins: [react(), eslint()],
    server: {
      // Port to serve the development server (used in dev mode only)
      port: 5174
    }
  }
});
