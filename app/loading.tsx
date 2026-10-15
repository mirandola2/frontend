export default function Loading() {
  return (
    <>
      {/* Hero-sized band so the white navbar stays readable and the layout doesn't jump */}
      <div className="bg-primary h-72 mb-5" />
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-primary" aria-label="Caricamento" />
      </div>
    </>
  )
}
