// Shared placeholder for the sidebar widgets that fetch data client-side.
export default function LoadingState({ error }: { error: boolean }) {
  if (error) return <span className="opacity-60">Dati non disponibili al momento.</span>
  return <span className="loading loading-spinner loading-xs" aria-label="Caricamento" />
}
