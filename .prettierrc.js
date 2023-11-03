// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
    arrowParens: 'always',
    printWidth: 80,
    singleQuote: false,
    semi: true,
    trailingComma: 'all',
    useTabs: false,
    tabWidth: 2,
    plugins: ['prettier-plugin-tailwindcss'],
}

export default config
