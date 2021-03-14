/* eslint-disable @typescript-eslint/no-var-requires */
const {faviconGenerator} = require('../dist/cjs')
const test = require('ava')
const path = require('path')

test('Check output files number.', async t => {
	const file = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const icons = [
		{
			width: 192,
			height: 192,
			format: 'png',
		},
		{
			width: 32,
			height: 32,
			format: 'png',
		},
	]

	const favicons = await faviconGenerator(file, icons)

	t.is(favicons.length, icons.length)
})

test('Check output file format.', async t => {
	const src = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const expectedFormat = 'png'
	const favicons = await faviconGenerator(src, [
		{
			width: 64,
			height: 64,
		},
	])

	t.is(favicons[0].format, expectedFormat)
})

test('Check output file height with passed width only.', async t => {
	const src = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const expectedSize = 64
	const favicons = await faviconGenerator(src, [
		{width: 64},
	])

	t.is(favicons[0].height, expectedSize)
})

test('Check output file width with passed height only.', async t => {
	const src = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const expectedSize = 64
	const favicons = await faviconGenerator(src, [
		{height: 64},
	])

	t.is(favicons[0].width, expectedSize)
})

test('Check output file radius option.', async t => {
	const src = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const favicons = await faviconGenerator(src, [
		{
			width: 128,
			height: 128,
			radius: 50,
		},
	])

	const favicon = favicons[0]

	t.is('radius' in favicon, true)
	t.is('xRadius' in favicon, true)
	t.is('yRadius' in favicon, true)
})

test('Check output file buffer.', async t => {
	const src = path.resolve(__dirname, 'fixtures', 'favicon.png')
	const favicons = await faviconGenerator(src, [
		{
			width: 128,
			height: 128,
			radius: 50,
		},
	])

	t.is(favicons[0].buffer instanceof Buffer, true)
})
