'use client'

import { useState } from 'react'

const morseDict: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---',
  P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-',
  W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  ' ': ' ',
}

const textDict: Record<string, string> = {}
for (const [k, v] of Object.entries(morseDict)) {
  textDict[v] = k
}

export default function Morse() {
  const [mexText, setMexText] = useState('')
  const [mexMorse, setMexMorse] = useState('')

  function text2morse(raw: string) {
    const cleaned = raw.toUpperCase().replace(/[^ A-Z0-9]/g, '').replace(/  +/g, ' ')
    setMexText(cleaned)
    const words = cleaned.split(' ').map(word =>
      word.split('').map(l => morseDict[l] || '?').join(' / ')
    )
    setMexMorse(words.join(' // '))
  }

  function morse2text(raw: string) {
    const cleaned = raw.toUpperCase().replace(/[^ \n./-]/g, '')
    setMexMorse(cleaned)
    const words = cleaned.split('//').map(word =>
      word.split('/').map(l => {
        const t = l.trim()
        return textDict[t] || '?'
      }).join('')
    )
    setMexText(words.join(' ').trim())
  }

  return (
    <div className="card not-prose lg:float-right my-5 lg:m-5 w-full lg:w-96 bg-neutral">
      <div className="card-body">
        <h2 className="card-title">Traduttore Morse</h2>
        <p>
          Scrivi un messaggio qui sotto per tradurlo! Puoi anche tradurre direttamente dal codice morse,
          separando le lettere con <strong>/</strong> e le parole con <strong>{'//'}</strong>.
        </p>
        <textarea
          className="textarea w-full bg-base-200 h-24 font-mono"
          placeholder="Messaggio (SOS)"
          value={mexText}
          onChange={e => text2morse(e.target.value)}
        />
        <textarea
          className="textarea w-full bg-base-200 h-24 font-mono"
          placeholder="Codice Morse (... / --- / ...)"
          value={mexMorse}
          onChange={e => morse2text(e.target.value)}
        />
      </div>
    </div>
  )
}
