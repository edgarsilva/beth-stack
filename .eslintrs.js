/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: import.meta.dir,
    ecmaFeatures: {
      jsx: true,
    },
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^__",
        varsIgnorePattern: "^__",
        caughtErrorsIgnorePattern: "^__",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],

    "import/consistent-type-specifier-style": ["error", "prefer-inline"],

    // These lint rules don't make sense for us but are enabled in the preset configs
    // "@typescript-eslint/no-confusing-void-expression": "off",
    // "@typescript-eslint/restrict-template-expressions": "off",

    // This rule doesn't seem to be working properly
    // "@typescript-eslint/prefer-nullish-coalescing": "off",
  },
};

module.exports = config;
