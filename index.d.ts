type InputFile = string | Buffer

type Format = 'jpeg'
	| 'png'
	| 'webp'
	| 'avif'
	| 'tiff'
	| 'ico'

interface InputFavicon {
	width?: number
	height?: number
	format?: Format
	radius?: number
}

interface OutputFavicon {
	buffer: Buffer
	width: number
	height: number
	format: Format
	radius?: number
	xRadius?: number
	yRadius?: number
}

declare const faviconGenerator: (file: InputFile, faviconList: InputFavicon[]) => Promise<OutputFavicon[]>

export {faviconGenerator}
