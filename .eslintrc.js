module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "_"
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": ["interface"],
        "format": ["PascalCase"],
        "custom": {
          "regex": "^I[A-Z]",
          "match": true
        }
      },
      {
        "selector": ["typeAlias"],
        "format": ["PascalCase"],
        "custom": {
          "regex": "[A-Z]*Type",
          "match": true
        }
      },
    ],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "no-bitwise": "warn",
    "class-methods-use-this": "off",
  },
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  }
};
