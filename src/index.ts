import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import type {
	InputFavicon,
	OutputFavicon,
	SourceOptions,
	InputFile,
	SharpFormat,
} from './types'

function percentToPx(percent: number, maxValue: number): number {
	return maxValue * percent / 100
}

async function faviconGenerator(src: InputFile, faviconList: InputFavicon[]): Promise<OutputFavicon[]> {
	const output: OutputFavicon[] = []
	const meta = await sharp(src).metadata()
	const source: SourceOptions = {
		file: src,
		format: meta.format as SharpFormat,
	}

	for (const favicon of faviconList) {
		const outputFavicon = await transformFavicon(favicon, source)
		output.push(outputFavicon)
	}

	return output
}

async function transformFavicon(favicon: InputFavicon, src: SourceOptions): Promise<OutputFavicon> {
	// sizes
	if (!favicon.width && !favicon.height) {
		throw new Error('You didn\'t specify width or height fields. One of these fields is required.')
	}

	// if width was passed and height was not passed height will be taken a value from width value
	// if height was passed and width was not passed width will be taken a value from height value
	const width = (favicon.width || favicon.height) as number
	const height = (favicon.height || favicon.width) as number

	const sh = sharp(src.file).resize(width, height)


	// format
	const format = favicon.format || src.format


	// radius
	let rx = 0
	let ry = 0

	if (favicon.radius) {
		rx = percentToPx(favicon.radius, width)
		ry = percentToPx(favicon.radius, height)
		const svgLayer = Buffer.from(
			'<svg>' +
			`<rect x="0" y="0" width="${width}" height="${height}" rx="${rx}" ry="${ry}" />` +
			'</svg>'
		)

		sh.composite([
			{
				input: svgLayer,
				blend: 'dest-in',
			},
		])
	}


	let buffer

	if (format === 'ico') {
		let pngBuffer

		// we support only png -> ico
		// so any non-png format should be transformed to png format
		// and then to ico
		if (src.format !== 'png') {
			pngBuffer = await sh
				.toFormat('png')
				.toBuffer()
		} else {
			pngBuffer = await sh.toBuffer()
		}

		buffer = await pngToIco(pngBuffer)
	} else {
		buffer = await sh
			.toFormat(format)
			.toBuffer()
	}

	return {
		buffer,
		width,
		height,
		format,
		...(favicon.radius && {
			radius: favicon.radius,
			xRadius: rx,
			yRadius: ry,
		}),
	}
}

export {faviconGenerator}
