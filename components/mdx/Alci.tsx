'use client'

import { useState, useMemo, useRef } from 'react'
import { useToast } from '@/hooks/useToast'

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'

interface PdfOptions {
  orientation: 'portrait' | 'landscape'
  fontFamily: string
  fontSize: number
  fontStyle: string
  margin: number
  imagePosition: 'under' | 'back'
}

export default function Alci() {
  const { toast, toastMessage, showToast } = useToast()
  const [count, setCount] = useState(50)
  const [format, setFormat] = useState('M-0-M')
  const [customSymbols, setCustomSymbols] = useState('!@#$%&*')
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([])
  const [expertMode, setExpertMode] = useState(false)
  const [separator, setSeparator] = useState('')
  const [showPdfOptions, setShowPdfOptions] = useState(false)
  const [textColor, setTextColor] = useState('#000000')
  const [colorHex, setColorHex] = useState('#000000')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageOpacity, setImageOpacity] = useState(100)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const defaultFontSize = useMemo(() => -35 * format.split('-').length + 320, [format])

  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    orientation: 'portrait',
    fontFamily: 'helvetica',
    fontSize: defaultFontSize,
    fontStyle: 'bold',
    margin: 10,
    imagePosition: 'under',
  })

  const isValidFormat = useMemo(() => {
    return /^[mM0$\s\-]+$/.test(format)
  }, [format])

  function getRandomFromSet(charset: string) {
    return charset[Math.floor(Math.random() * charset.length)]
  }

  function generateString(formatPattern: string) {
    const parts = formatPattern.split('-')
    const result = parts.map(part => {
      const chars = Array.from(part).map(char => {
        if (char === 'M') return uppercaseChars
        if (char === 'm') return lowercaseChars
        if (char === '0') return digits
        if (char === '$') return customSymbols || '!@#$%&*'
        return ''
      })
      const combined = chars.join('')
      return combined ? getRandomFromSet(combined) : ''
    })
    return result.join(separator || '')
  }

  function generateStrings() {
    if (!isValidFormat || count <= 0) return

    const strings = new Set<string>()
    const maxAttempts = count * 1000
    let attempts = 0

    while (strings.size < count && attempts < maxAttempts) {
      strings.add(generateString(format))
      attempts++
    }

    setGeneratedStrings(Array.from(strings))
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.cssText = 'position:fixed;left:-9999px;opacity:0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    toast('Alce Copiata!')
  }

  async function copyAllToClipboard() {
    await copyToClipboard(generatedStrings.join('\n'))
  }

  function getFileName(extension: string) {
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `alci_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${generatedStrings.length}.${extension}`
  }

  function exportToTxt() {
    const content = generatedStrings.join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = getFileName('txt')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = event => setUploadedImage(event.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  function updateColorFromInput(val: string) {
    setTextColor(val)
    if (val.startsWith('#') && /^#[0-9A-Fa-f]{6}$/.test(val)) {
      setColorHex(val)
    } else if (val.includes(',')) {
      const rgb = val.split(',').map(c => parseInt(c.trim()))
      if (rgb.length === 3 && rgb.every(c => c >= 0 && c <= 255)) {
        setColorHex(`#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`)
      }
    }
  }

  return (
    <>
      <div className="card not-prose my-5 w-full max-w-3xl mx-auto bg-neutral">
        <div className="card-body">
          <h2 className="card-title">Generatore di Alci</h2>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Numero di alci:</span>
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={e => setCount(Math.max(1, Math.min(Number(e.target.value), 1000)))}
              placeholder="50"
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div className="form-control w-full flex flex-row items-center gap-2">
            <label className="label cursor-pointer">
              <span className="label-text">Modalità Expert 🧙</span>
              <input
                type="checkbox"
                checked={expertMode}
                onChange={e => setExpertMode(e.target.checked)}
                className="toggle toggle-secondary toggle-md ml-2"
              />
            </label>
          </div>

          {expertMode && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Pattern: usa <code>m</code>, <code>M</code>, <code>0</code>, e{' '}
                  <code>$</code> come segnaposto per rispettivamente lettere minuscole
                  o maiuscole, numeri e simboli scelti casualmente. Usa <code>-</code>{' '}
                  per separare uno o più segnaposto che generaranno singoli caratteri.
                </span>
              </label>
              <input
                type="text"
                value={format}
                onChange={e => { setFormat(e.target.value); setGeneratedStrings([]) }}
                className="input input-bordered w-full bg-base-200 font-[monospace]"
              />
              <label className="label">
                <span className="label-text">Separatore</span>
              </label>
              <input
                type="text"
                value={separator}
                onChange={e => { setSeparator(e.target.value); setGeneratedStrings([]) }}
                placeholder="(nessuno)"
                className="input input-bordered w-full bg-base-200 font-[monospace]"
              />
            </div>
          )}

          {format.includes('$') && expertMode && (
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Simboli personalizzati:</span>
              </label>
              <input
                type="text"
                value={customSymbols}
                onChange={e => setCustomSymbols(e.target.value)}
                placeholder="!@#$%^&*"
                className="input input-bordered w-full bg-base-200 font-[monospace]"
              />
            </div>
          )}

          {!isValidFormat && format && (
            <div className="alert alert-error">
              <span>Formato non valido.</span>
            </div>
          )}

          <button
            onClick={generateStrings}
            disabled={!isValidFormat}
            className="btn btn-primary w-full mt-4"
          >
            Genera Stringhe
          </button>

          {generatedStrings.length > 0 && (
            <>
              <div className="flex gap-2 mt-2 flex-wrap items-stretch">
                <button onClick={copyAllToClipboard} className="btn btn-sm flex-1">
                  Copia Tutto
                </button>
                <button onClick={exportToTxt} className="btn btn-secondary btn-sm flex-1">
                  Esporta .txt
                </button>
                <button
                  onClick={() => setShowPdfOptions(!showPdfOptions)}
                  className={`btn btn-secondary btn-sm flex-1 ${showPdfOptions ? 'btn-active' : ''}`}
                >
                  Esporta PDF...
                </button>
              </div>

              {showPdfOptions && (
                <div className="mt-2 p-4 bg-base-200 rounded-lg border border-primary">
                  <h3 className="font-bold mb-3">Esporta PDF 🚧</h3>
                  <p className="text-sm mb-4">
                    L&apos;esportazione del PDF è ancora sperimentale. Selezionando la
                    modalità expert puoi regolare alcune impostazioni o lasciare quelle
                    predefinte che sono quelle raccomandate.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {expertMode && (
                      <div className="form-control md:col-span-2">
                        <label className="label"><span className="label-text font-bold">Orientamento</span></label>
                        <span className="text-xs p-1 mb-2">
                          In modalità verticale (predefinto) la carta sarà da rifilare
                          nella parte bassa per creare un quadrato che può essere piegato
                          in due. In modalità orizzontale sarà sufficiente piegare il
                          foglio in due per la parte lunga e ottenere così l&apos;alce.
                        </span>
                        <select
                          value={pdfOptions.orientation}
                          onChange={e => setPdfOptions({ ...pdfOptions, orientation: e.target.value as 'portrait' | 'landscape' })}
                          className="select select-bordered select-sm"
                        >
                          <option value="portrait">Verticale</option>
                          <option value="landscape">Orizzontale</option>
                        </select>
                      </div>
                    )}

                    {expertMode && (
                      <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Font</span></label>
                        <select
                          value={pdfOptions.fontFamily}
                          onChange={e => setPdfOptions({ ...pdfOptions, fontFamily: e.target.value })}
                          className="select select-bordered select-sm"
                        >
                          <option value="helvetica">Helvetica</option>
                          <option value="times">Times</option>
                          <option value="courier">Courier</option>
                        </select>
                      </div>
                    )}

                    {expertMode && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-bold">
                            Dimensione font{pdfOptions.fontSize !== defaultFontSize && ` (default: ${defaultFontSize})`}
                          </span>
                        </label>
                        <input
                          type="number"
                          value={pdfOptions.fontSize}
                          onChange={e => setPdfOptions({ ...pdfOptions, fontSize: Number(e.target.value) })}
                          className="input input-bordered input-sm"
                        />
                      </div>
                    )}

                    {expertMode && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-bold">
                            Margine{pdfOptions.margin !== 10 && ' (default: 10)'}
                          </span>
                        </label>
                        <input
                          type="number"
                          value={pdfOptions.margin}
                          onChange={e => setPdfOptions({ ...pdfOptions, margin: Number(e.target.value) })}
                          className="input input-bordered input-sm"
                        />
                      </div>
                    )}

                    {expertMode && (
                      <div className="form-control">
                        <label className="label"><span className="label-text font-bold">Stile font</span></label>
                        <select
                          value={pdfOptions.fontStyle}
                          onChange={e => setPdfOptions({ ...pdfOptions, fontStyle: e.target.value })}
                          className="select select-bordered select-sm"
                        >
                          <option value="normal">Normale</option>
                          <option value="bold">Grassetto</option>
                          <option value="italic">Corsivo</option>
                          <option value="bolditalic">Grassetto Corsivo</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {expertMode && (
                    <div className="form-control w-full mt-4">
                      <label className="label"><span className="label-text font-bold">Colore testo PDF:</span></label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={textColor}
                          onChange={e => updateColorFromInput(e.target.value)}
                          placeholder="255,0,0 o #FF0000"
                          className="input input-bordered input-sm flex-1 bg-base-200 font-[monospace]"
                        />
                        <input
                          type="color"
                          value={colorHex}
                          onChange={e => { setColorHex(e.target.value); setTextColor(e.target.value) }}
                          className="w-12 h-12 border-2 border-base-300 rounded-full cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {expertMode && (
                    <div className="form-control w-full mt-4">
                      <label className="label"><span className="label-text font-bold">Logo (opzionale):</span></label>
                      <span className="text-xs p-1 mb-2">
                        L&apos;immagine apparirà sotto il testo nel PDF, mantenendo le proporzioni originali
                      </span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered file-input-sm w-full bg-base-200"
                      />
                    </div>
                  )}

                  {uploadedImage && expertMode && (
                    <div className="mt-2 form-control w-full">
                      <label className="label"><span className="label-text">Opacità logo:</span></label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={imageOpacity}
                        onChange={e => setImageOpacity(Number(e.target.value))}
                        className="input input-bordered input-sm"
                      />
                    </div>
                  )}

                  {uploadedImage && expertMode && (
                    <div className="mt-2 form-control w-full">
                      <label className="label"><span className="label-text">Posizione logo:</span></label>
                      <span className="text-xs p-1 mb-2">
                        Scegliendo &quot;Retro del foglio&quot; la stampa dovrà essere fronte retro e il logo verrà stampato su quello che diventerà l&apos;interno dell&apos;alce. Scegliendo &quot;Sotto il testo&quot; il logo verrà stampato capovolto e sarà a contatto con la fronte.
                      </span>
                      <select
                        value={pdfOptions.imagePosition}
                        onChange={e => setPdfOptions({ ...pdfOptions, imagePosition: e.target.value as 'under' | 'back' })}
                        className="select select-bordered select-sm"
                      >
                        <option value="under">Sotto il testo (ruotato)</option>
                        <option value="back">Retro del foglio</option>
                      </select>
                    </div>
                  )}

                  <button
                    onClick={exportToPdfWithDialog}
                    className="btn btn-accent btn-sm w-full mt-4"
                    disabled={generatedStrings.length === 0}
                  >
                    Genera PDF
                  </button>
                </div>
              )}

              <div className="mt-5 font-bold">
                Alci Generate ({generatedStrings.length})
              </div>
              <div className="grid gap-2 lg:grid-cols-6 grid-cols-3">
                {generatedStrings.map((str, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(str)}
                    className="btn btn-sm btn-outline font-[monospace] w-auto min-w-fit max-w-full text-left wrap-break-word"
                    title="Copia"
                  >
                    {str}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <p>Questa funzionalità non è ancora implementata. Usa l&apos;esportazione .txt per ora.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Chiudi</button>
            </form>
          </div>
        </div>
      </dialog>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  )

  async function exportToPdfWithDialog() {
    dialogRef.current?.showModal()
  }
}
