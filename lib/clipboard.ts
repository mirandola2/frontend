export async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // fall through to the legacy path (e.g. insecure context or denied permission)
    }
  }
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0'
  document.body.appendChild(textArea)
  textArea.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(textArea)
  if (!ok) throw new Error('Copy command failed')
}
