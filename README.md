# Step-by-Step Guide: Creating an Electron App with Vite

## Prerequisites

- Node.js installed recommended version node LTS ( 22.16.0)
- pnpm recommended version (10.9.0)

---

Check Versions ---->

1. node version --> node -v
2. npm version --> npm -v
3. typescript (globally) --> tsc -version
4.

## Method 1: Electron + Vite (Recommended Modern Approach)

### 1. Create a Vite project

```bash
pnpm create vite@latest my-electron-app --template react-ts

cd my-electron-app
pnpm install
pnpm run dev
```

### Note:--->

1.  To run the application you need to include the certifications

### To Package and bundle it to an exe file

1. Step one to copy the below code and paste it in the package.json after dependencies object

```javascript
"build": {
"appId": "Generic-UI",
"productName": "Generic UI",
"directories": {
"buildResources": "resources",
"output": "release"
},
"files": [
"out",
"dist-electron",
"node_modules",
"package.json"
],
"win": {
"target": "nsis",
"icons": "build/icon.ico"
},
"nsis": {
"oneClick": false,
"perMachine": false,
"allowToChangeInstallationDirectory": true
}
},

```

2. Run the below command

```javascript
pnpm run build:win
```

above will bundle the whole app in a exe file and you can find it inside the release folder you can share it and install it , It will work as a native desktop application

<<<<<<<<<<<-------------------------------------------------->>>>>>>>>>

# ESLint Configuration with Electron Toolkit, TypeScript, React, and Prettier

This document explains the ESLint configuration used in your Electron + React + TypeScript project. It includes detailed information about the plugins and rules applied, as well as additional suggested rules for maintaining code quality.

---

## 📦 Packages Used

### 1. **@electron-toolkit/eslint-config-ts**

- **Purpose:** Provides base ESLint rules for TypeScript projects in Electron apps.
- **Contents:**

  - `@typescript-eslint/eslint-plugin`
  - `@typescript-eslint/parser`
  - Recommended rules for:
    - Type safety
    - Best practices
    - Code clarity

- **Config:** `tseslint.configs.recommended` includes:
  - `@typescript-eslint/no-unused-vars`
  - `@typescript-eslint/explicit-module-boundary-types`
  - `@typescript-eslint/no-explicit-any`
  - `@typescript-eslint/consistent-type-imports`

---

### 2. **@electron-toolkit/eslint-config-prettier**

- **Purpose:** Disables ESLint rules that conflict with Prettier.
- **Why:** Avoids double formatting rules and focuses formatting via Prettier only.

---

### 3. **eslint-plugin-react**

- **Purpose:** Provides linting rules for React code.
- **Configs Used:**

  - `eslintPluginReact.configs.flat.recommended`
    - Includes rules like:
      - `react/no-deprecated`
      - `react/jsx-no-undef`
      - `react/react-in-jsx-scope`
  - `eslintPluginReact.configs.flat["jsx-runtime"]`
    - Supports new JSX transform (React 17+)

- **Settings:**
  ```json
  {
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
  ```

---

### 4. **eslint-plugin-react-hooks**

- **Purpose:** Enforces rules of React Hooks usage.
- **Rules Included:**
  - `react-hooks/rules-of-hooks`: Ensures hooks are used correctly.
  - `react-hooks/exhaustive-deps`: Checks effect dependencies.

---

### 5. **eslint-plugin-react-refresh**

- **Purpose:** Ensures compatibility with Vite's Fast Refresh for React.
- **Rules (vite-specific):**
  - `react-refresh/only-export-components`: Warns if non-component exports are present in a module using Fast Refresh.

---

---

## 📁 Directory Ignore

```js
{
  ignores: ['**/node_modules', '**/dist', '**/out'];
}
```

---

## ✍ Additional ESLint Rules — Explanation & Benefits

Below is a detailed explanation of additional useful rules you can add to your ESLint configuration.

---

### ✅ Code Style & Safety

| Rule                          | Description                                                                | Why It’s Helpful                                                              |
| ----------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `eqeqeq: ["error", "always"]` | Enforces the use of `===` and `!==` instead of `==` and `!=`.              | Prevents unintended type coercion, making code more predictable and bug-free. |
| `curly: ["error", "all"]`     | Requires braces `{}` for all control statements (if, else, etc.).          | Improves readability and avoids bugs due to ambiguous control structures.     |
| `no-console: ["warn"]`        | Warns when `console.log` or similar is used.                               | Helps keep debug logs out of production code.                                 |
| `no-debugger: "error"`        | Disallows `debugger` statements.                                           | Prevents accidental debugger breakpoints in deployed code.                    |
| `prefer-const: "error"`       | Suggests using `const` instead of `let` if variables are never reassigned. | Encourages immutability and reduces potential side-effects.                   |
| `no-var: "error"`             | Disallows `var`, encouraging `let` and `const`.                            | Promotes block scoping and safer variable handling.                           |

---

### 🧠 TypeScript Rules

| Rule                                                       | Description                                                      | Why It’s Helpful                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------ |
| `@typescript-eslint/explicit-function-return-type: "warn"` | Requires functions to define return types explicitly.            | Enhances type safety, especially in public APIs. |
| `@typescript-eslint/no-misused-promises: "error"`          | Prevents incorrect usage of promises (e.g., in `if`, `forEach`). | Avoids bugs related to asynchronous logic.       |

---

### ⚛️ React-Specific Rules

| Rule                                           | Description                                                                             | Why It’s Helpful                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `react/jsx-boolean-value: ["error", "always"]` | Requires explicitly passing boolean values as props (e.g., `<Comp disabled={true} />`). | Improves clarity, especially for newer developers. |
| `react/self-closing-comp: "error"`             | Enforces self-closing tags for components without children.                             | Keeps JSX clean and concise.                       |
| `react/no-unescaped-entities: "warn"`          | Warns when raw characters like `'`, `<`, `>` are used directly in JSX.                  | Prevents invalid HTML or rendering issues.         |
| `react/no-unknown-property: "error"`           | Ensures you’re using valid DOM props (e.g., `className` not `class`).                   | Prevents runtime errors and bugs from typos.       |

---

These rules complement the base configuration and help maintain high code quality, safety, and readability.

---

## 🛠 Best Practices

- Always use `tsx` for React components with JSX.
- Keep formatting with Prettier; avoid style rules in ESLint.
- Use `eslint --fix` during CI or pre-commit hooks.
- Apply consistent naming, typing, and structure with TypeScript.

---

## ✅ Summary

| Plugin                        | Purpose                            |
| ----------------------------- | ---------------------------------- |
| `eslint-plugin-react`         | Lint React-specific patterns       |
| `eslint-plugin-react-hooks`   | Enforce Hook rules                 |
| `eslint-plugin-react-refresh` | Fast Refresh compatibility         |
| `@typescript-eslint/*`        | TypeScript syntax & safety rules   |
| `eslint-config-prettier`      | Disable formatting conflicts       |
| `Electron Toolkit ESLint`     | All-in-one Electron/TS integration |

---

## 📚 References

- [ESLint](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/rules/)
- [React Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [React Hooks Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [React Refresh Plugin](https://www.npmjs.com/package/eslint-plugin-react-refresh)
- [Prettier](https://prettier.io/)
