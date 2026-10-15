'use client'

import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// Split out so the lightbox code and CSS are only downloaded when a figure is opened.
export default function FigLightbox(props: React.ComponentProps<typeof Lightbox>) {
  return <Lightbox {...props} />
}
