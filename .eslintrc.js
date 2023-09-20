module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', '@nuxtjs/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true
        }
      }
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{vue,vue-router,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**}',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '{vuetify,vuetify/**}',
            group: 'parent',
            position: 'before'
          },
          {
            pattern:
              '{#/plugins/**,#/stores/**,#/router.ts,#/helpers/**,#/interfaces/**,#/types/**,#/components/**,#/views/**}',
            group: 'internal',
            position: 'before'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/no-explicit-any': 'error',

    'vue/html-self-closing': [
      'error',
      {
        html: { normal: 'always', void: 'always', component: 'always' },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/no-v-html': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'import/no-named-as-default-member': 'off',
    'import/export': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-use-before-define': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'arrow-parens': 'off',
    semi: 'off',
    'vue/no-multiple-template-root': 'off',
    'spaced-comment': 'off',
    'space-before-function-paren': 'off'
  }
};
