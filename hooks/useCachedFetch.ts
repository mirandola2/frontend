'use client'

import { useState, useEffect } from 'react'

interface CacheEntry<T> {
  value: T
  expires: number
}

const memoryCache = new Map<string, CacheEntry<unknown>>()

function readCache<T>(key: string): T | null {
  const fromMemory = memoryCache.get(key) as CacheEntry<T> | undefined
  if (fromMemory && fromMemory.expires > Date.now()) return fromMemory.value

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
  const [data, setData] = useState<T | null>(() => readCache<T>(url))
  const [loaded, setLoaded] = useState(() => readCache<T>(url) !== null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (readCache<T>(url) !== null) return

    let cancelled = false
    fetch(url)
      .then(res => res.json())
      .then((json: T) => {
        if (cancelled) return
        writeCache(url, json, ttlMs)
        setData(json)
        setLoaded(true)
      })
      .catch(() => {
        if (!cancelled) {
          setError(true)
          setLoaded(true)
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  return { data, loaded, error }
}
