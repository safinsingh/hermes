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
		}
	],
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	root: true,
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-confusing-void-expression': 'off',
		// FIXME
		'import/no-unresolved': 'off',
		'no-console': 'off',
		'node/no-missing-import': 'off',
		'node/no-process-env': 'off'
	},
	settings: {
		'import/resolver': {
			typescript: {}
		}
	}
}
