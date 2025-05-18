require('dotenv-flow').config();

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	cacheDirectory: '.tmp/jestCache',
	collectCoverageFrom: [
		'src/**/*.ts',
		'!**/routes/**'
	],
	coverageThreshold: {
		global: {
			statements: 10,
			branches: 10,
			functions: 10,
			lines: 10
		}
	},
	coveragePathIgnorePatterns: [
		'DependendyInjection/'
	]
};
