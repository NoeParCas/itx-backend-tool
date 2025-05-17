const itxBackendToolApi = [
	'--require-module ts-node/register',
	'tests/cucumber/features/*.feature',
	'--require tests/cucumber/features/step_definitions/*.steps.ts',
].join(' ')

module.exports = {
	itxBackendToolApi
}
