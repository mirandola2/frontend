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
