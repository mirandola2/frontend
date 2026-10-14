import type { Metadata, Viewport } from 'next'
import { Ubuntu, Caprasimo, Playfair_Display } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const ubuntu = Ubuntu({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ubuntu',
})

const caprasimo = Caprasimo({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caprasimo',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

// Only these Material Symbols are downloaded (~3 KB instead of ~370 KB).
// When using a new icon (also via `icon="..."` in MDX), add it here, keeping alphabetical order.
const ICONS = [
  'center_focus_strong',
  'checklist',
  'east',
  'link',
  'logout',
  'movie',
  'navigate_before',
  'navigate_next',
  'newspaper',
  'open_in_new',
  'other_admission',
  'photo_camera',
  'videocam',
]
const ICONS_URL = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${ICONS.join(',')}&display=block`

export const metadata: Metadata = {
  metadataBase: new URL('https://mirandola2.it'),
  title: {
    default: 'AGESCI Scout Mirandola 2 ~ Da più di 40 anni facciamo giochi, avventure e strade.',
    template: '%s ~ Scout Mirandola 2',
  },
  description: 'Siamo a Mirandola dal 1983: scopri le ultime notizie, la nostra storia, i nostri staff, i nomi totem, la galleria foto e video e una raccolta di strumenti utili.',
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#462678',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${ubuntu.variable} ${caprasimo.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" />
        {/* Icon font: `display=block` avoids flashing the ligature names as text. */}
        <link rel="stylesheet" href={ICONS_URL} />
      </head>
      <body>
        <Header>
          <main className="flex-1">{children}</main>
          <Footer />
        </Header>
      </body>
    </html>
  )
}
