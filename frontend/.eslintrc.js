module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "indent": ["error", 4],
    "quotes": ["error", "double"],
    "react/prop-types": "off",
    "prefer-regex-literals": "off"
  }
}
