import { getQuotes } from '@/lib/content'
import type { Quote as QuoteType } from '@/lib/content'

interface QuoteProps {
  type?: string
  quote?: string
  className?: string
}

export default function Quote({ type, quote, className = '' }: QuoteProps) {
  let displayQuote: QuoteType | null = null

  if (quote) {
    displayQuote = { text: quote, type: type || '' }
  } else if (type) {
    const quotes = getQuotes().filter((q) => q.type === type)
    if (quotes.length > 0) {
      displayQuote = quotes[Math.floor(Math.random() * quotes.length)]
    }
  }

  if (!displayQuote) return null

  return (
    <div
      className={`my-8 max-w-xl mx-auto italic text-center font-serif text-xl ${className}`}
      style={{ textWrap: 'balance' }}
    >
      &laquo;{displayQuote.text}&raquo;{' '}
      {displayQuote.author && <>({displayQuote.author})</>}
    </div>
  )
}
