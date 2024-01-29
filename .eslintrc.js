module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:jest/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-unescaped-entities": ["error", { forbid: [">", "}"] }],
    "react/prop-types": [0, { ignore: ["children"] }],
    "react/no-children-prop": [
      0,
      {
        allowFunctions: true,
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.spec.js", "**/*.spec.jsx"],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
