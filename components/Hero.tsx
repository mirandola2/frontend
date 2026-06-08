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
    <div className="hero relative mb-5 overflow-hidden">
      {image && (
        <Image
          src={image}
          alt="Hero Image"
          width={1920}
          height={400}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={`absolute inset-0 ${bgColor[color] || bgColor.primary} opacity-75`} />
      <div className={`container relative z-10 mx-auto flex max-w-4xl flex-col text-white md:flex-row md:px-12 ${big ? 'pt-28 pb-44' : 'py-28'}`}>
        <div className="text-center md:text-left md:mr-auto">
          <h2 className="mb-5 text-lg md:text-3xl">AGESCI - Gruppo Scout Mirandola 2</h2>
          <h1 className="font-display text-5xl md:text-6xl">{title}</h1>
        </div>
      </div>
    </div>
  )
}
