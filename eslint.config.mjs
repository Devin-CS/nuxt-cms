// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    /* Stylistic */
    '@stylistic/comma-dangle': [
      'error',
      'never'
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
      'error', 2,
      { baseIndent: 0 }
    ]
  }
})
