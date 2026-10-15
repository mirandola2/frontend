'use client'

import { useState, useMemo } from 'react'
import { useToast } from '@/hooks/useToast'
import { copyText } from '@/lib/clipboard'
import Toast from '@/components/Toast'
import { exportAlciPdf } from '@/lib/alciPdf'

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'
const defaultSymbols = '!@#$%&*'

interface PdfOptions {
  orientation: 'portrait' | 'landscape'
  fontFamily: string
  /** null = default size, computed from the pattern length */
  fontSize: number | null
  fontStyle: string
  margin: number
  imagePosition: 'under' | 'back'
}

function getRandomFromSet(charset: string) {
  return charset[Math.floor(Math.random() * charset.length)]
}

function Field({ legend, hint, className = '', children }: {
  legend: React.ReactNode
  hint?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <fieldset className={`fieldset ${className}`}>
      <legend className="fieldset-legend">{legend}</legend>
      {hint && <p className="text-xs opacity-70 -mt-1 mb-1">{hint}</p>}
      {children}
    </fieldset>
  )
}

export default function Alci() {
  const { toast, toastMessage, showToast } = useToast()
  const [count, setCount] = useState(50)
  const [format, setFormat] = useState('M-0-M')
  const [customSymbols, setCustomSymbols] = useState(defaultSymbols)
  const [generatedStrings, setGeneratedStrings] = useState<string[]>([])
  const [expertMode, setExpertMode] = useState(false)
  const [separator, setSeparator] = useState('')
  const [showPdfOptions, setShowPdfOptions] = useState(false)
  const [textColor, setTextColor] = useState('#000000')
  const [colorHex, setColorHex] = useState('#000000')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [imageOpacity, setImageOpacity] = useState(100)
  const [exporting, setExporting] = useState(false)

  const defaultFontSize = useMemo(() => -35 * format.split('-').length + 320, [format])

  const [pdfOptions, setPdfOptions] = useState<PdfOptions>({
    orientation: 'portrait',
    fontFamily: 'helvetica',
    fontSize: null,
    fontStyle: 'bold',
    margin: 10,
    imagePosition: 'under',
  })

  const isValidFormat = useMemo(() => /^[mM0$\s\-]+$/.test(format), [format])

  function generateString(formatPattern: string) {
    return formatPattern
      .split('-')
      .map(part => {
        const combined = Array.from(part)
          .map(char => {
            if (char === 'M') return uppercaseChars
            if (char === 'm') return lowercaseChars
            if (char === '0') return digits
            if (char === '$') return customSymbols || defaultSymbols
            return ''
          })
          .join('')
        return combined ? getRandomFromSet(combined) : ''
      })
      .join(separator)
  }

  function generateStrings() {
    if (!isValidFormat || count <= 0) return

    const strings = new Set<string>()
    const maxAttempts = count * 1000
    for (let attempts = 0; strings.size < count && attempts < maxAttempts; attempts++) {
      strings.add(generateString(format))
    }
    setGeneratedStrings(Array.from(strings))
  }

  async function copyToClipboard(text: string, message = 'Alce Copiata!') {
    try {
      await copyText(text)
      toast(message)
    } catch {
      toast('Impossibile copiare')
    }
  }

  function getFileName(extension: string) {
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `alci_${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${generatedStrings.length}.${extension}`
  }

  function exportToTxt() {
    const blob = new Blob([generatedStrings.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = getFileName('txt')
    link.click()
    URL.revokeObjectURL(url)
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = event => setUploadedImage(event.target?.result as string)
    reader.readAsDataURL(file)
  }

  function updateColorFromInput(val: string) {
    setTextColor(val)
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      setColorHex(val)
    } else if (val.includes(',')) {
      const rgb = val.split(',').map(c => parseInt(c.trim()))
      if (rgb.length === 3 && rgb.every(c => c >= 0 && c <= 255)) {
        setColorHex(`#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`)
      }
    }
  }

  const updatePdf = (patch: Partial<PdfOptions>) => setPdfOptions(options => ({ ...options, ...patch }))
  const fontSize = pdfOptions.fontSize ?? defaultFontSize

  async function exportToPdf() {
    if (generatedStrings.length === 0 || exporting) return
    setExporting(true)
    try {
      await exportAlciPdf(
        generatedStrings,
        { ...pdfOptions, fontSize, color: colorHex, image: uploadedImage, imageOpacity },
        getFileName('pdf'),
      )
    } catch (err) {
      console.error('PDF export failed:', err)
      toast('Errore durante la creazione del PDF')
    } finally {
      setExporting(false)
    }
  }

  return (
    <>
      <div className="card not-prose my-5 w-full max-w-3xl mx-auto bg-neutral">
        <div className="card-body">
          <h2 className="card-title">Generatore di Alci</h2>

          <Field legend="Numero di alci">
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={e => setCount(Math.max(1, Math.min(Number(e.target.value), 1000)))}
              placeholder="50"
              className="input w-full bg-base-200"
            />
          </Field>

          <label className="label cursor-pointer w-fit text-base-content mt-2">
            Modalità Expert 🧙
            <input
              type="checkbox"
              checked={expertMode}
              onChange={e => setExpertMode(e.target.checked)}
              className="toggle toggle-secondary"
            />
          </label>

          {expertMode && (
            <>
              <Field
                legend="Pattern"
                hint={
                  <>
                    Usa <code>m</code>, <code>M</code>, <code>0</code>, e <code>$</code> come segnaposto per
                    rispettivamente lettere minuscole o maiuscole, numeri e simboli scelti casualmente.
                    Usa <code>-</code> per separare uno o più segnaposto che genereranno singoli caratteri.
                  </>
                }
              >
                <input
                  type="text"
                  value={format}
                  onChange={e => { setFormat(e.target.value); setGeneratedStrings([]) }}
                  className="input w-full bg-base-200 font-mono"
                />
              </Field>
              <Field legend="Separatore">
                <input
                  type="text"
                  value={separator}
                  onChange={e => { setSeparator(e.target.value); setGeneratedStrings([]) }}
                  placeholder="(nessuno)"
                  className="input w-full bg-base-200 font-mono"
                />
              </Field>
              {format.includes('$') && (
                <Field legend="Simboli personalizzati">
                  <input
                    type="text"
                    value={customSymbols}
                    onChange={e => setCustomSymbols(e.target.value)}
                    placeholder="!@#$%^&*"
                    className="input w-full bg-base-200 font-mono"
                  />
                </Field>
              )}
            </>
          )}

          {!isValidFormat && format && (
            <div role="alert" className="alert alert-error">
              <span>Formato non valido.</span>
            </div>
          )}

          <button type="button" onClick={generateStrings} disabled={!isValidFormat} className="btn btn-primary w-full mt-4">
            Genera Stringhe
          </button>

          {generatedStrings.length > 0 && (
            <>
              <div className="flex gap-2 mt-2 flex-wrap items-stretch">
                <button
                  type="button"
                  onClick={() => copyToClipboard(generatedStrings.join('\n'), 'Alci Copiate!')}
                  className="btn btn-sm flex-1"
                >
                  Copia Tutto
                </button>
                <button type="button" onClick={exportToTxt} className="btn btn-secondary btn-sm flex-1">
                  Esporta .txt
                </button>
                <button
                  type="button"
                  onClick={() => setShowPdfOptions(!showPdfOptions)}
                  className={`btn btn-secondary btn-sm flex-1 ${showPdfOptions ? 'btn-active' : ''}`}
                  aria-expanded={showPdfOptions}
                >
                  Esporta PDF...
                </button>
              </div>

              {showPdfOptions && (
                <div className="mt-2 p-4 bg-base-200 rounded-box border border-primary">
                  <h3 className="font-bold mb-3">Esporta PDF 🚧</h3>
                  <p className="text-sm mb-4">
                    L&apos;esportazione del PDF è ancora sperimentale. Selezionando la
                    modalità expert puoi regolare alcune impostazioni o lasciare quelle
                    predefinite che sono quelle raccomandate.
                  </p>

                  {expertMode && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Field
                          legend="Orientamento"
                          className="md:col-span-2"
                          hint="In modalità verticale (predefinito) la carta sarà da rifilare nella parte bassa per creare un quadrato che può essere piegato in due. In modalità orizzontale sarà sufficiente piegare il foglio in due per la parte lunga e ottenere così l'alce."
                        >
                          <select
                            value={pdfOptions.orientation}
                            onChange={e => updatePdf({ orientation: e.target.value as PdfOptions['orientation'] })}
                            className="select select-sm w-full"
                          >
                            <option value="portrait">Verticale</option>
                            <option value="landscape">Orizzontale</option>
                          </select>
                        </Field>

                        <Field legend="Font">
                          <select
                            value={pdfOptions.fontFamily}
                            onChange={e => updatePdf({ fontFamily: e.target.value })}
                            className="select select-sm w-full"
                          >
                            <option value="helvetica">Helvetica</option>
                            <option value="times">Times</option>
                            <option value="courier">Courier</option>
                          </select>
                        </Field>

                        <Field legend={<>Dimensione font{fontSize !== defaultFontSize && ` (default: ${defaultFontSize})`}</>}>
                          <input
                            type="number"
                            value={fontSize}
                            onChange={e => updatePdf({ fontSize: e.target.value === '' ? null : Number(e.target.value) })}
                            className="input input-sm w-full"
                          />
                        </Field>

                        <Field legend={<>Margine{pdfOptions.margin !== 10 && ' (default: 10)'}</>}>
                          <input
                            type="number"
                            value={pdfOptions.margin}
                            onChange={e => updatePdf({ margin: Number(e.target.value) })}
                            className="input input-sm w-full"
                          />
                        </Field>

                        <Field legend="Stile font">
                          <select
                            value={pdfOptions.fontStyle}
                            onChange={e => updatePdf({ fontStyle: e.target.value })}
                            className="select select-sm w-full"
                          >
                            <option value="normal">Normale</option>
                            <option value="bold">Grassetto</option>
                            <option value="italic">Corsivo</option>
                            <option value="bolditalic">Grassetto Corsivo</option>
                          </select>
                        </Field>
                      </div>

                      <Field legend="Colore testo PDF" className="mt-2">
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={textColor}
                            onChange={e => updateColorFromInput(e.target.value)}
                            placeholder="255,0,0 o #FF0000"
                            className="input input-sm flex-1 bg-base-100 font-mono"
                          />
                          <input
                            type="color"
                            value={colorHex}
                            onChange={e => { setColorHex(e.target.value); setTextColor(e.target.value) }}
                            className="w-10 h-10 border-2 border-base-300 rounded-full cursor-pointer"
                            aria-label="Scegli colore"
                          />
                        </div>
                      </Field>

                      <Field
                        legend="Logo (opzionale)"
                        className="mt-2"
                        hint="L'immagine apparirà sotto il testo nel PDF, mantenendo le proporzioni originali"
                      >
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleImageUpload}
                          className="file-input file-input-sm w-full bg-base-100"
                        />
                      </Field>

                      {uploadedImage && (
                        <>
                          <Field legend="Opacità logo" className="mt-2">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={imageOpacity}
                              onChange={e => setImageOpacity(Number(e.target.value))}
                              className="input input-sm w-full"
                            />
                          </Field>

                          <Field
                            legend="Posizione logo"
                            className="mt-2"
                            hint={
                              <>
                                Scegliendo &quot;Retro del foglio&quot; la stampa dovrà essere fronte retro e il logo verrà
                                stampato su quello che diventerà l&apos;interno dell&apos;alce. Scegliendo &quot;Sotto il
                                testo&quot; il logo verrà stampato capovolto e sarà a contatto con la fronte.
                              </>
                            }
                          >
                            <select
                              value={pdfOptions.imagePosition}
                              onChange={e => updatePdf({ imagePosition: e.target.value as PdfOptions['imagePosition'] })}
                              className="select select-sm w-full"
                            >
                              <option value="under">Sotto il testo (ruotato)</option>
                              <option value="back">Retro del foglio</option>
                            </select>
                          </Field>
                        </>
                      )}
                    </>
                  )}

                  <button
                    type="button"
                    onClick={exportToPdf}
                    disabled={exporting}
                    className="btn btn-accent btn-sm w-full mt-4"
                  >
                    {exporting && <span className="loading loading-spinner loading-xs" />}
                    Genera PDF
                  </button>
                </div>
              )}

              <div className="mt-5 font-bold">Alci Generate ({generatedStrings.length})</div>
              <div className="grid gap-2 lg:grid-cols-6 grid-cols-3">
                {generatedStrings.map((str, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => copyToClipboard(str)}
                    className="btn btn-sm btn-outline font-mono w-auto min-w-fit max-w-full wrap-break-word"
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

      <Toast show={showToast} message={toastMessage} />
    </>
  )
}
