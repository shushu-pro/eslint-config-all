module.exports = {
  root: true,
  extends: ["plugin:react/recommended", "@shushu.pro/eslint-config-base"],
  plugins: ["react"],
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/jsx-key": [1, { checkFragmentShorthand: true }],

    "react/no-unescaped-entities": ["error", { forbid: [">", "<"] }],
  },
  settings: {
    // 'import/extensions': ['.js', '.jsx'],
    "import/resolver": {
      // alias: {
      //   map: [['@', './src']],
      //   extensions: ['.js', '.jsx', '.json '],
      // },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    react: {
      version: "detect",
    },

    // 忽略导入类型错误提示
    "import/ignore": [/\.(scss|less|css)$/],
  },
};
