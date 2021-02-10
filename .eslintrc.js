/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
	extends: [
		'canonical',
		'canonical/typescript',
		'canonical/node',
		'plugin:prettier/recommended',
		'prettier/@typescript-eslint',
		'prettier/babel'
	],
	overrides: [
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-require-imports': 'off',
				'@typescript-eslint/no-var-requires': 'off',
				'import/no-commonjs': 'off',
				'import/unambiguous': 'off'
			}
		},
		{
			files: ['\\.*\\.js', '*.d.ts'],
			rules: {
				'filenames/match-regex': 'off'
			}
		}
	],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	root: true,
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'no-console': 'off',
		'node/no-missing-import': 'off'
	}
}
