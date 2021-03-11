module.exports = {
	extends: [
		'@commitlint/config-conventional',
	],
	rules: {
		'type-enum': [
			2,
			'always',
			[
				// install packaeg
				// remove package
				// add file
				// remove file
				'chore',
				// bug fix
				// fix linter errors
				'fix',
				// change spaces to tabs
				// change brackets space
				// etc...
				'style',
				// change README
				'docs',
			],
		],
	},
}
