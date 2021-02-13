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
		},
		{
			files: ['./hermes-server/src/resolvers/*'],
			rules: {
				'@typescript-eslint/no-unused-vars': 'off',
				'class-methods-use-this': 'off',
				'fp/no-class': 'off'
			}
		},
		{
			files: ['*.d.ts'],
			rules: {
				'@typescript-eslint/consistent-type-definitions': 'off',
				'import/unambiguous': 'off'
			}
		},
		{
			files: ['./hermes-server/src/index.ts'],
			rules: {
				'import/no-unassigned-import': 'off'
			}
		}
	],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	root: true,
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-confusing-void-expression': 'off',
		'newline-before-return': 'off',
		'no-console': 'off',
		'no-warning-comments': 'off',
		'node/no-missing-import': 'off',
		'node/no-process-env': 'off',
		'promise/catch-or-return': 'off',
		'unicorn/prevent-abbreviations': 'off'
	},
	settings: {
		'import/resolver': {
			typescript: {}
		}
	}
}
