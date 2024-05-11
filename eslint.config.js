import globals from "globals";
import eslint from "@eslint/js";

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    ignores: ["node_modules", ".cache", "build", "public/build", ".env"],
  },
  {
    ...eslint.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.es5,
      },
    },
  },
];
