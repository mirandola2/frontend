import Sidebar from './Sidebar'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container flex flex-col lg:flex-row gap-5 pt-5">
      <div className="mx-auto w-full min-w-0">{children}</div>
      <Sidebar />
    </div>
  )
}
