/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  jsxSingleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  tailwindFunctions: ['clsx', 'tw', 'cva'],
}

export default config
