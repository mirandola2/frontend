import { getQuotes } from '@/lib/content'
import RandomQuote from './RandomQuote'

interface QuoteProps {
  type?: string
  quote?: string
  className?: string
}

export default function Quote({ type, quote, className = '' }: QuoteProps) {
  const quotes = quote ? [{ text: quote, type: type || '' }] : getQuotes().filter(q => q.type === type)
  if (quotes.length === 0) return null

  return (
    <blockquote className={`my-8 max-w-xl mx-auto px-4 italic text-center font-serif text-xl text-balance ${className}`}>
      <RandomQuote quotes={quotes} />
    </blockquote>
  )
}
