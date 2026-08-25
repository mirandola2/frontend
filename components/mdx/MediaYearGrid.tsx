'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useToast } from '@/hooks/useToast'

interface MediaEntry {
  type: string
  id: string
  year: number
  name: string
  url: string
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

  function formatUrlId(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  function getTypeIcon(type: string) {
    return type === 'photo' ? 'photo_camera' : 'videocam'
  }

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

    const el = document.getElementById(formatUrlId(cardId))
    if (!el) {
      await new Promise(r => setTimeout(r, 100))
      const retry = document.getElementById(formatUrlId(cardId))
      if (!retry) return
      if (jumpToElement) {
        let top = 0
        let curr: HTMLElement | null = retry
        while (curr) { top += curr.offsetTop; curr = curr.offsetParent as HTMLElement }
        window.scrollTo({ top: top - 200, behavior: 'smooth' })
      }
      retry.focus({ preventScroll: true })
      return
    }

    if (jumpToElement) {
      let top = 0
      let curr: HTMLElement | null = el
      while (curr) { top += curr.offsetTop; curr = curr.offsetParent as HTMLElement }
      window.scrollTo({ top: top - 200, behavior: 'smooth' })
    }
    el.focus({ preventScroll: true })
  }, [])

  const copyLink = useCallback(async (entry: MediaEntry) => {
    const cardId = formatUrlId(entry.id || entry.name)
    const currentUrl = window.location.origin + window.location.pathname
    const params = new URLSearchParams(window.location.search)
    const queryString = params.toString()
    const fullUrl = `${currentUrl}${queryString ? '?' + queryString : ''}#${cardId}`

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullUrl)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = fullUrl
        textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;'
        document.body.appendChild(textArea)
        textArea.select()
        textArea.setSelectionRange(0, textArea.value.length)
        if (!document.execCommand('copy')) throw new Error('Copy command failed')
        document.body.removeChild(textArea)
      }

      history.replaceState(null, '', `#${cardId}`)
      await focusCard(cardId, true)
      toast('Link Copiato!')
    } catch (err) {
      console.error('Failed to copy link:', err)
      history.replaceState(null, '', `#${cardId}`)
      await focusCard(cardId, true)
    }
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
              className="input input-sm input-bordered input-secondary w-full pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <select
              value={sortDesc ? 'true' : 'false'}
              onChange={e => setSortDesc(e.target.value === 'true')}
              className="select select-sm select-bordered select-secondary text-secondary font-bold w-full sm:w-auto"
            >
              <option value="true">Dal più recente</option>
              <option value="false">Dal meno recente</option>
            </select>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="select select-sm select-bordered select-secondary text-secondary font-bold w-full sm:w-auto"
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
              <span className="material-symbols-rounded text-xs">photo_camera</span>
              {typeStats.photo}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-rounded text-xs">videocam</span>
              {typeStats.video}
            </span>
          </div>
        </div>
      </div>

      {(searchQuery.trim() || selectedType !== 'both') && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setSearchQuery(''); setSelectedType('both') }}
            className="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancella filtri
          </button>
        </div>
      )}

      {grouped.length === 0 && (
        <div className="text-center py-12">
          <div className="text-base-content/50 mb-2">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-base-content/70">Nessun risultato trovato</p>
          <p className="text-base-content/50">Prova a modificare i termini di ricerca o i filtri</p>
        </div>
      )}

      {grouped.map(group => (
        <div key={group.year} className="bg-base-200 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Anno {group.year}-{group.year + 1}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {group.entries.map(entry => {
              const cardId = formatUrlId(entry.id || entry.name)
              return (
                <div
                  key={`${entry.type}-${entry.name}-${entry.year}`}
                  id={cardId}
                  className="card bg-base-100 shadow hover:shadow-2xl transition-all duration-200 group focus:outline-none focus:shadow-2xl focus:ring-4 focus:ring-secondary focus:ring-offset-4"
                  tabIndex={0}
                >
                  <div className="card-body">
                    <span className="material-symbols-rounded text-sm">{getTypeIcon(entry.type)}</span>

                    <a
                      href={entry.url}
                      className="card-title text-base font-normal group-hover:text-secondary group-hover:underline transition-colors"
                    >
                      {entry.name}
                    </a>

                    <div className="card-actions justify-end mt-auto">
                      <button
                        onClick={e => { e.preventDefault(); copyLink(entry) }}
                        className="btn btn-ghost btn-sm transition-opacity duration-200"
                        title="Copia link"
                      >
                        <span className="material-symbols-rounded">link</span>
                      </button>
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline btn-secondary hover:btn-secondary-focus transition-colors"
                      >
                        <span className="material-symbols-rounded">east</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
