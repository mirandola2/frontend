import Image from 'next/image'

interface HeroProps {
  title: string
  image?: string
  color?: string
  big?: boolean
}

const bgColor: Record<string, string> = {
  lc: 'bg-lc',
  eg: 'bg-eg',
  rs: 'bg-rs',
  cc: 'bg-cc',
  primary: 'bg-primary',
}

export default function Hero({ title, image, color = 'primary', big = false }: HeroProps) {
  return (
    <div className={`hero relative overflow-hidden bg-primary ${big ? 'mb-5' : 'mb-10'}`}>
      {image && (
        <Image src={image} alt="" fill sizes="100vw" preload className="object-cover" />
      )}
      <div className={`absolute inset-0 ${bgColor[color] || bgColor.primary} opacity-75`} />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
      <div
        className={`container relative z-10 mx-auto flex max-w-4xl flex-col text-white md:flex-row md:px-12 ${
          big ? 'pt-28 pb-44' : 'py-28'
        }`}
      >
        <div className="text-center md:text-left md:mr-auto">
          <p className="mb-4 text-lg md:text-2xl opacity-90">AGESCI - Gruppo Scout Mirandola 2</p>
          <h1 className="font-display text-5xl md:text-6xl">{title}</h1>
        </div>
      </div>
    </div>
  )
}
