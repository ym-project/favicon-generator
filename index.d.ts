import type {
	FormatEnum,
	AvailableFormatInfo,
} from 'sharp'

type SharpFormat = keyof FormatEnum | AvailableFormatInfo
type InputFile = string | Buffer

interface InputFavicon {
	width?: number
	height?: number
	format?: SharpFormat
	radius?: number
}

interface OutputFavicon {
	buffer: Buffer
	width: number
	height: number
	format: SharpFormat
	radius?: number
	xRadius?: number
	yRadius?: number
}

declare const faviconGenerator: (file: InputFile, faviconList: InputFavicon[]) => Promise<OutputFavicon[]>

export {faviconGenerator}
