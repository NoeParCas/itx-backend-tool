import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection'
import { config as envConfig } from 'dotenv-flow'

let container: ContainerBuilder

async function loadContainer(){
	if(container) { return container }

	envConfig()

	container = new ContainerBuilder()

	const env = process.env.NODE_ENV || 'dev'
	const loader = new YamlFileLoader(container)

	await loader.load(`${process.cwd()}/src/Itx/Infrastructure/DependencyInjection/application_${env}.yaml`)

	return container
}

export {
	loadContainer,
	container
}
