import globals from "globals";
import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  {
    ignores: ["node_modules", ".cache", "build", "public/build", ".env"],
  },
  // 全体の設定
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
        ...globals.node,
      },
    },
  },
  // Reactの設定
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
  },
  // TypeScriptの設定
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
];
