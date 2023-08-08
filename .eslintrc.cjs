/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution.js");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/airbnb",
    "plugin:import/typescript",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "import/extensions": [
      "error",
      "always",
      {
        pattern: {
          ts: "never",
        },
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
