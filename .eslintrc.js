module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-typescript'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		'indent': ['error', 4],
		'@typescript-eslint/indent': ['error', 4],
		'react/jsx-indent': ['error', 4],
		'react/jsx-indent-props': ['error', 4],
	},
	ignorePatterns: ['.eslintrc.js']
};
