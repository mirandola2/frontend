# Phase 5: Hooks & Shared Logic

## Goal
Migrate composables to React hooks and create a shared content hook for CSV data access.

## Hook List

### 5.1 useToast

```tsx
// hooks/useToast.ts
'use client'

import { useState } from 'react'

export function useToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  const toast = (msg: string, duration = 1000) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), duration)
  }

  return { toastMessage: message, showToast: visible, toast }
}
```

Same signature as the Vue composable for minimal client component changes.

### 5.2 useContent (optional convenience hook)

```tsx
// hooks/useContent.ts
import { getStaff, getMedia, getQuotes } from '@/lib/content'
import type { StaffMember, MediaEntry, Quote } from '@/lib/content'

export function useStaff(): StaffMember[] {
  return getStaff()
}

export function useMedia(): MediaEntry[] {
  return getMedia()
}

export function useQuotes(): Quote[] {
  return getQuotes()
}
```

These are simple wrappers around the build-time content loader. Used in Server Components or passed to Client Components as props.

### 5.3 useCookie wrapper (client-side)

```tsx
// hooks/useCookie.ts
'use client'
import Cookies from 'js-cookie'

export function useCookie(name: string) {
  const get = () => Cookies.get(name)
  const set = (value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(name, value, options)
  const remove = () => Cookies.remove(name)
  return { get, set, remove }
}
```

Used by CodiceSocio component to replace `useCookie("psk")`.

## State Management Decision
**No global state library needed** — same as the current Vue codebase.
- No Pinia/Vuex replacement
- All state is local (component-level `useState`)
- Content data passed as props from Server Components
- External API data fetched directly in client components
