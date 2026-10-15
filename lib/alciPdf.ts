// PDF export for the "Generatore Alci" utility: one alce (string) per A4 page, optionally
// with a logo either under the text (rotated, it ends up on the forehead once folded) or on
// the back of the sheet.

export interface AlciPdfOptions {
  orientation: 'portrait' | 'landscape'
  fontFamily: string
  fontSize: number
  fontStyle: string
  margin: number
  imagePosition: 'under' | 'back'
  color: string
  image: string | null
  imageOpacity: number
}

interface PreparedImage {
  data: string
  type: 'PNG' | 'JPEG'
  x: number
  y: number
  width: number
  height: number
}

function hexToRgb(hex: string) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] as const : null
}

function prepareImage(src: string, options: AlciPdfOptions, pageWidth: number, lineHeight: number) {
  return new Promise<PreparedImage>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      // Same height as the text, keeping the aspect ratio
      const height = lineHeight
      const width = height * (img.width / img.height)
      const scale = 4

      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas not supported'))
      ctx.translate(canvas.width / 2, canvas.height / 2)
      if (options.imagePosition === 'under') ctx.rotate(Math.PI)
      ctx.scale(scale, scale)
      ctx.globalAlpha = options.imageOpacity / 100
      ctx.drawImage(img, -width / 2, -height / 2, width, height)

      const type = src.startsWith('data:image/png') ? 'PNG' : 'JPEG'
      resolve({
        data: canvas.toDataURL(type === 'PNG' ? 'image/png' : 'image/jpeg'),
        type,
        width,
        height,
        x: (pageWidth - width) / 2,
        y: options.imagePosition === 'under' ? options.margin * 3 + lineHeight : options.margin,
      })
    }
    img.onerror = reject
    img.src = src
  })
}

export async function exportAlciPdf(strings: string[], options: AlciPdfOptions, fileName: string) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: options.orientation, unit: 'mm', format: 'a4' })

  const pageWidth = options.orientation === 'landscape' ? 297 : 210
  const lineHeight = (options.fontSize / 2.835) * 0.9 // pt -> mm

  doc.setFont(options.fontFamily, options.fontStyle)
  doc.setFontSize(options.fontSize)
  const rgb = hexToRgb(options.color)
  if (rgb) doc.setTextColor(...rgb)

  let image: PreparedImage | null = null
  if (options.image) {
    try {
      image = await prepareImage(options.image, options, pageWidth, lineHeight)
    } catch (err) {
      console.error('Error processing image:', err)
    }
  }

  strings.forEach((str, index) => {
    doc.text(str, (pageWidth - doc.getTextWidth(str)) / 2, options.margin + lineHeight)

    if (image) {
      if (options.imagePosition === 'back') doc.addPage()
      doc.addImage(image.data, image.type, image.x, image.y, image.width, image.height)
    }

    if (index < strings.length - 1) doc.addPage()
  })

  doc.save(fileName)
}
