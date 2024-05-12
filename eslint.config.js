import globals from "globals";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default tsEslint.config(
  {
    ignores: ["node_modules", ".cache", "build", "public/build", ".env"],
  },
  // 全体の設定
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
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
    plugins: {
      react: pluginReact,
    },
    rules: {},
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
  }
);
