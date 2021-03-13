/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises')
const path = require('path')
const distFolder = 'dist'

Promise.resolve()
	.then(() => fs.rm(path.resolve(__dirname, '..', distFolder), {
		force: true,
		recursive: true,
	}))
	.then(() => console.info(`folder ${distFolder} was removed`))
