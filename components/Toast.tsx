export default function Toast({ show, message }: { show: boolean; message: string }) {
  if (!show) return null
  return (
    <div className="toast toast-top toast-center z-50" role="status">
      <div className="alert alert-info shadow-lg">
        <span>{message}</span>
      </div>
    </div>
  )
}
