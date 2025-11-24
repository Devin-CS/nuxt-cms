// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    /* Stylistic */
    '@stylistic/comma-dangle': [
      'error',
      'only-multiline'
    ],

    '@stylistic/no-tabs': [
      'error',
      { allowIndentationTabs: true }
    ],

    /* TS */
    '@typescript-eslint/no-unused-vars': [
      'error',
      { caughtErrorsIgnorePattern: '^_' }
    ],

    /* Vue */
    'vue/html-closing-bracket-newline': [
      'error',
      { multiline: 'never', selfClosingTag: { multiline: 'never' } }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      { selfClosingTag: 'never' }
    ],
    'vue/html-indent': [
      'error', 'tab',
      { baseIndent: 0 }
    ]
  }
})

/* Available Configs

gitignore,
nuxt/javascript,
nuxt/typescript/setup,
nuxt/typescript/rules,
nuxt/vue/setup,
nuxt/vue/rules,
nuxt/import/rules,
nuxt/setup,
nuxt/vue/single-root,
nuxt/rules,
nuxt/sort-config,
nuxt/stylistic,
nuxt/disables/routes,
nuxt/import-globals
 */
