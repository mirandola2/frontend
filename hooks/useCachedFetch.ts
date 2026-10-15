'use client'

import { useState, useEffect } from 'react'

interface CacheEntry<T> {
  value: T
  expires: number
}

interface FetchState<T> {
  data: T | null
  loaded: boolean
  error: boolean
}

const memoryCache = new Map<string, CacheEntry<unknown>>()

function readMemory<T>(key: string): T | null {
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined
  return entry && entry.expires > Date.now() ? entry.value : null
}

function readCache<T>(key: string): T | null {
  const fromMemory = readMemory<T>(key)
  if (fromMemory !== null) return fromMemory

  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (entry.expires <= Date.now()) return null
    memoryCache.set(key, entry)
    return entry.value
  } catch {
    return null
  }
}

function writeCache<T>(key: string, value: T, ttlMs: number) {
  const entry: CacheEntry<T> = { value, expires: Date.now() + ttlMs }
  memoryCache.set(key, entry)
  try {
    sessionStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // sessionStorage unavailable or full; memory cache still applies for this session
  }
}

export function useCachedFetch<T>(url: string, ttlMs = 5 * 60 * 1000) {
  // Only the in-memory cache is read during render: it is empty while hydrating a
  // prerendered page, so the first client render matches the static HTML. It still
  // gives an instant render when navigating client-side between pages.
  const [state, setState] = useState<FetchState<T>>(() => {
    const data = readMemory<T>(url)
    return { data, loaded: data !== null, error: false }
  })

  useEffect(() => {
    let cancelled = false
    const cachedValue = readCache<T>(url)
    const request: Promise<T> =
      cachedValue !== null
        ? Promise.resolve(cachedValue)
        : fetch(url).then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            return res.json()
          })

    request
      .then(json => {
        if (cancelled) return
        if (cachedValue === null) writeCache(url, json, ttlMs)
        setState({ data: json, loaded: true, error: false })
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, loaded: true, error: true })
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return state
}
