'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useToast } from '@/hooks/useToast'
import { copyText } from '@/lib/clipboard'
import Toast from '@/components/Toast'
import { ArrowSquareOut, Camera, LinkSimple, MagnifyingGlass, VideoCamera, X } from '@phosphor-icons/react'

interface MediaEntry {
  type: string
  id: string
  year: number
  name: string
  url: string
}

function formatUrlId(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function TypeIcon({ type, size }: { type: string; size: number }) {
  return type === 'photo'
    ? <Camera size={size} weight="duotone" aria-label="Foto" />
    : <VideoCamera size={size} weight="duotone" aria-label="Video" />
}

interface MediaYearGridProps {
  media: MediaEntry[]
}

export default function MediaYearGrid({ media }: MediaYearGridProps) {
  const { toast, toastMessage, showToast } = useToast()

  const [sortDesc, setSortDesc] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('both')

  const filteredData = useMemo(() => {
    let filtered = media

    if (selectedType !== 'both') {
      filtered = filtered.filter(row => row.type === selectedType)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(
        row =>
          row.name?.toLowerCase().includes(query) ||
          row.year?.toString().includes(query) ||
          (row.year + 1)?.toString().includes(query)
      )
    }

    return filtered
  }, [media, selectedType, searchQuery])

  const grouped = useMemo(() => {
    const groups: Record<number, MediaEntry[]> = {}

    filteredData.forEach(row => {
      const year = Number(row.year)
      if (!groups[year]) groups[year] = []
      groups[year].push(row)
    })

    const sortedYears = Object.keys(groups)
      .map(Number)
      .sort((a, b) => (sortDesc ? b - a : a - b))

    return sortedYears.map(year => ({ year, entries: groups[year] }))
  }, [filteredData, sortDesc])

  const typeStats = useMemo(() => {
    const stats = { photo: 0, video: 0 }
    filteredData.forEach(item => {
      stats[item.type as 'photo' | 'video']++
    })
    return stats
  }, [filteredData])

  const updateUrl = useCallback(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams()

    if (searchQuery.trim()) params.set('search', searchQuery.trim())
    if (selectedType !== 'both') params.set('type', selectedType)
    if (!sortDesc) params.set('sort', 'asc')

    const queryString = params.toString()
    const url = queryString
      ? `${window.location.pathname}?${queryString}${window.location.hash}`
      : window.location.pathname + window.location.hash

    window.history.replaceState({}, '', url)
  }, [searchQuery, selectedType, sortDesc])

  const initializeFromUrl = useCallback(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    setSearchQuery(params.get('search') || '')
    setSelectedType(params.get('type') || 'both')
    setSortDesc(params.get('sort') !== 'asc')
  }, [])

  const focusCard = useCallback(async (cardId: string, jumpToElement = false) => {
    if (!cardId) return
    const id = formatUrlId(cardId)
    let el = document.getElementById(id)
    if (!el) {
      // the grid may not be rendered yet right after mount
      await new Promise(r => setTimeout(r, 100))
      el = document.getElementById(id)
      if (!el) return
    }
    if (jumpToElement) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.focus({ preventScroll: true })
  }, [])

  const copyLink = useCallback(async (entry: MediaEntry) => {
    const cardId = formatUrlId(entry.id || entry.name)
    const fullUrl = `${window.location.origin}${window.location.pathname}${window.location.search}#${cardId}`

    try {
      await copyText(fullUrl)
      toast('Link Copiato!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
    history.replaceState(null, '', `#${cardId}`)
    await focusCard(cardId, true)
  }, [focusCard, toast])

  const handleHashChange = useCallback(async () => {
    const cardId = window.location.hash.replace('#', '')
    if (cardId) await focusCard(cardId, true)
  }, [focusCard])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initializeFromUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const card = params.get('card') || window.location.hash.replace('#', '')
    if (card) setTimeout(() => focusCard(card, true), 100)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [focusCard, handleHashChange])

  useEffect(() => {
    updateUrl()
  }, [updateUrl])

  return (
    <div className="not-prose space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cerca per nome o anno..."
              className="input input-sm input-secondary w-full pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlass size={16} weight="bold" className="text-base-content/50" aria-hidden />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              value={sortDesc ? 'true' : 'false'}
              onChange={e => setSortDesc(e.target.value === 'true')}
              className="select select-sm select-secondary text-secondary font-bold w-full sm:w-auto"
            >
              <option value="true">Dal più recente</option>
              <option value="false">Dal meno recente</option>
            </select>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="select select-sm select-secondary text-secondary font-bold w-full sm:w-auto"
            >
              <option value="both">Foto e Video</option>
              <option value="photo">Solo Foto</option>
              <option value="video">Solo Video</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-base-content/70">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <TypeIcon type="photo" size={16} />
              {typeStats.photo}
            </span>
            <span className="flex items-center gap-1">
              <TypeIcon type="video" size={16} />
              {typeStats.video}
            </span>
          </div>
        </div>
      </div>

      {(searchQuery.trim() || selectedType !== 'both') && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setSelectedType('both') }}
            className="btn btn-sm btn-ghost"
          >
            <X size={16} weight="bold" aria-hidden />
            Cancella filtri
          </button>
        </div>
      )}

      {grouped.length === 0 && (
        <div className="text-center py-12">
          <div className="text-base-content/50 mb-2">
            <MagnifyingGlass size={48} weight="duotone" className="mx-auto mb-4" aria-hidden />
          </div>
          <p className="text-lg font-medium text-base-content/70">Nessun risultato trovato</p>
          <p className="text-base-content/50">Prova a modificare i termini di ricerca o i filtri</p>
        </div>
      )}

      {grouped.map(group => (
        <div key={group.year} className="bg-base-200 p-6 rounded-box">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Anno {group.year}-{group.year + 1}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {group.entries.map(entry => {
              const cardId = formatUrlId(entry.id || entry.name)
              return (
                <div
                  key={`${entry.type}-${entry.name}-${entry.year}`}
                  id={cardId}
                  className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow duration-200 group focus:outline-none focus:shadow-lg focus:ring-4 focus:ring-secondary focus:ring-offset-4"
                  tabIndex={0}
                >
                  <div className="card-body">
                    <TypeIcon type={entry.type} size={20} />

                    <a
                      href={entry.url}
                      className="card-title text-base font-normal group-hover:text-secondary group-hover:underline transition-colors"
                    >
                      {entry.name}
                    </a>

                    <div className="card-actions justify-end mt-auto">
                      <button
                        type="button"
                        onClick={e => { e.preventDefault(); copyLink(entry) }}
                        className="btn btn-ghost btn-sm btn-square"
                        title="Copia link"
                        aria-label="Copia link"
                      >
                        <LinkSimple size={18} weight="bold" aria-hidden />
                      </button>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline btn-primary btn-square"
                        aria-label={`Apri ${entry.name}`}
                      >
                        <ArrowSquareOut size={18} weight="bold" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <Toast show={showToast} message={toastMessage} />
    </div>
  )
}
