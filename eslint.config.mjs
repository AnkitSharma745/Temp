// Import TypeScript ESLint config from Electron Toolkit
import tseslint from '@electron-toolkit/eslint-config-ts';

// Import Prettier config for ESLint to disable conflicting rules
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';

// Import React ESLint plugin
import eslintPluginReact from 'eslint-plugin-react';

// Import React Hooks ESLint plugin
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

// Import React Refresh plugin for fast refresh support in dev
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';

// Export the ESLint config using the Electron Toolkit's base TS config
export default tseslint.config(
  // Ignore common build and dependency folders
  { ignores: ['**/node_modules', '**/dist', '**/out'] },

  // Include recommended rules from the TypeScript ESLint config
  tseslint.configs.recommended,

  // Use React plugin's recommended rules
  eslintPluginReact.configs.flat.recommended,

  // Add support for the JSX runtime (React 17+)
  eslintPluginReact.configs.flat['jsx-runtime'],

  // Configure React plugin to detect the installed React version
  {
    settings: {
      react: {
        version: 'detect' // Automatically picks the React version from package.json
      }
    }
  },

  // Apply additional rules to TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'], // Target all TypeScript and TSX files
    plugins: {
      'react-hooks': eslintPluginReactHooks, // Add hooks plugin
      'react-refresh': eslintPluginReactRefresh // Add React Fast Refresh plugin
    },
    rules: {
      // Use recommended rules for React Hooks
      ...eslintPluginReactHooks.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      // Use Vite-specific rules for React Refresh (Fast Refresh)
      ...eslintPluginReactRefresh.configs.vite.rules
    }
  },

  // Apply Prettier config to disable conflicting formatting rules
  eslintConfigPrettier
);
