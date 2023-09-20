module.exports = {
  extends: ['stylelint-config-recommended-vue/scss'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html'
    }
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/no-global-function-names': null,
    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'no-descending-specificity': null
  }
};
