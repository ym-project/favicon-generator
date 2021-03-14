import type {
	FormatEnum,
	AvailableFormatInfo,
} from 'sharp'

export type SharpFormat = keyof FormatEnum | AvailableFormatInfo
export type InputFile = string | Buffer

export interface InputFavicon {
	width?: number
	height?: number
	format?: SharpFormat
	radius?: number
}

export interface OutputFavicon {
	buffer: Buffer
	width: number
	height: number
	format: SharpFormat
	radius?: number
	xRadius?: number
	yRadius?: number
}

export interface SourceOptions {
	file: InputFile
	format: SharpFormat
}
