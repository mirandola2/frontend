import Sidebar from './Sidebar'

// `belowNavbar`: the page has no Hero, so leave room for the fixed navbar.
export default function BlogLayout({
  children,
  belowNavbar = false,
}: {
  children: React.ReactNode
  belowNavbar?: boolean
}) {
  return (
    <div className={`container flex flex-col lg:flex-row gap-5 ${belowNavbar ? 'pt-28' : 'pt-5'}`}>
      <div className="mx-auto w-full min-w-0">{children}</div>
      <Sidebar />
    </div>
  )
}
