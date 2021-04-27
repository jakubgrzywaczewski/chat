module.exports = {
    env: {
      es2020: true,
      jest: true,
      node: true
    },
    extends: [
      "eslint:recommended", 
      "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname
    },
    plugins: [
      "@typescript-eslint",
      "prettier"
    ],
    root: true,
    rules: {
      "@typescript-eslint/indent": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "indent": "off",
      "linebreak-style": [0, "error", "windows"],
      "@typescript-eslint/explicit-function-return-type": 0
    }
  }