import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactJSXRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tsEslint from "typescript-eslint";

const compat = new FlatCompat();

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default tsEslint.config(
  {
    ignores: ["node_modules", ".cache", "build", "public/build", ".env"],
  },
  // 全体の設定
  {
    ...eslint.configs.recommended,
    extends: [],
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
      import: importPlugin,
    },
    languageOptions: {
      ...reactRecommended.languageOptions,
      ...reactJSXRuntime.languageOptions,
    },

    extends: [
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
      "import/internal-regex": "^@/",
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        typescript: {},
      },
    },
    rules: {
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "parent",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
          },
          "newlines-between": "never",
        },
      ],
    },
  },
  // TypeScriptの設定
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
    extends: [...tsEslint.configs.recommended],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  // Prettierの設定
  {
    extends: [eslintConfigPrettier],
    rules: {},
  }
);
