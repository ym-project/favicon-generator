# favicon generator

NodeJS library for favicon generation.

Supported input file formats: `JPEG`, `PNG`, `WebP`, `AVIF`, `TIFF`, `GIF`, `SVG`

Supported output file formats: `JPEG`, `PNG`, `WebP`, `AVIF`, `TIFF`

## Example
```js
const {faviconGenerator} = reqiure('favicon-generator')
const fs = require('fs/promises')

faviconGenerator('./favicon.png', [
    {
        width: 64,
        format: 'png',
    },
    {
        width: 192,
        height: 192,
    }
]).then(async favicons => {
    /*
    favicons [
        0: {
            width: 64,
            height: 64,
            format: 'png',
            buffer: Buffer,
        },
        1: {
            width: 192,
            height: 192,
            format: 'png',
            buffer: Buffer,
        },
    ]
    */

    await fs.writeFile('./favicon1.png', favicons[0].buffer)
    await fs.writeFile('./favicon2.png', favicons[1].buffer)
})
```

## Arguments
You can find arguments list in [declaration file](https://github.com/ym-project/favicon-generator/blob/master/index.d.ts).
