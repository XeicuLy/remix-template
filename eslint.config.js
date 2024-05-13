import globals from "globals";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default tsEslint.config(
  {
    ignores: ["node_modules", ".cache", "build", "public/build", ".env"],
  },
  // 全体の設定
  {
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],
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
    ...reactRecommended,
    ...reactJSXRuntime,
    plugins: {
      react: reactPlugin,
      ["jsx-a11y"]: jsxA11yPlugin,
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ...reactJSXRuntime.languageOptions,
    },
    rules: {},
    extends: [],
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/resolver": {
        typescript: {},
      },
    },
  },
  // TypeScriptの設定
  {
    files: ["**/*.{ts,tsx}"],
    extends: [],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  // Prettierの設定
  {
    extends: [eslintConfigPrettier],
    rules: {},
  }
);
