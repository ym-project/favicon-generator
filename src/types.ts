import type {FormatEnum} from 'sharp'

export type InputFile = string | Buffer

export interface InputFavicon {
	width?: number
	height?: number
	format?: Format
	radius?: number
}

export interface OutputFavicon {
	buffer: Buffer
	width: number
	height: number
	format: Format
	radius?: number
	xRadius?: number
	yRadius?: number
}

export interface SourceOptions {
	file: InputFile
	format: keyof FormatEnum | undefined
}

export type Format = 'jpeg'
	| 'png'
	| 'webp'
	| 'avif'
	| 'tiff'
	| 'ico'
