/* eslint-disable @typescript-eslint/no-var-requires */
const {build} = require('esbuild')
const path = require('path')
const {dependencies} = require('../package.json')
const distFolder = 'dist'

const commonOptions = {
	entryPoints: [
		path.resolve(__dirname, '..', 'src', 'index.ts'),
	],
	bundle: true,
	platform: 'node',
	sourcemap: true,
	external: getExternalDependencyList(),
}

function getExternalDependencyList() {
	return Object
		.entries(dependencies)
		.map(([dependency]) => dependency)
}

function buildCjsModule() {
	return build({
		...commonOptions,
		outfile: path.resolve(__dirname, '..', distFolder, 'cjs.js'),
		format: 'cjs',
	})
}

function buildEsmModule() {
	return build({
		...commonOptions,
		outfile: path.resolve(__dirname, '..', distFolder, 'esm.mjs'),
		format: 'esm',
	})
}

Promise.resolve()
	.then(() => buildCjsModule())
	.then(() => console.info('CommonJS module was built'))
	.then(() => buildEsmModule())
	.then(() => console.info('EcmaScript module was built'))
