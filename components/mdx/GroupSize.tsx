export default function GroupSize() {
  return (
    <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
      <div className="card bg-primary text-primary-content">
        <div className="card-body items-center text-center">
          <span className="text-3xl font-bold">~80</span>
          <span className="text-sm">Lupetti e Coccinelle</span>
        </div>
      </div>
      <div className="card bg-eg text-lc-content">
        <div className="card-body items-center text-center">
          <span className="text-3xl font-bold">~60</span>
          <span className="text-sm">Esploratori e Guide</span>
        </div>
      </div>
      <div className="card bg-rs text-rs-content">
        <div className="card-body items-center text-center">
          <span className="text-3xl font-bold">~30</span>
          <span className="text-sm">Rover e Scolte</span>
        </div>
      </div>
      <div className="card bg-cc text-white">
        <div className="card-body items-center text-center">
          <span className="text-3xl font-bold">~30</span>
          <span className="text-sm">Capi</span>
        </div>
      </div>
    </div>
  )
}
