'use client'
import Cookies from 'js-cookie'

export function useCookie(name: string) {
  const get = () => Cookies.get(name)
  const set = (value: string, options?: Cookies.CookieAttributes) =>
    Cookies.set(name, value, options)
  const remove = () => Cookies.remove(name)
  return { get, set, remove }
}
