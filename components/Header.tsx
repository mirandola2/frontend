import Link from 'next/link'
import Image from 'next/image'
import HeaderNavbar from './HeaderNavbar'

interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Chi Siamo',
    children: [
      { label: "L'Associazione", href: '/associazione' },
      { label: 'Il Gruppo', href: '/gruppo' },
      { label: 'La Comunità Capi', href: '/coca' },
      { label: 'Il Progetto Educativo', href: '/progetto' },
      { label: 'Contatti', href: '/contatti' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
    ],
  },
  {
    label: 'Lupetti e Coccinelle',
    children: [
      { label: 'La Branca L/C', href: '/lc/' },
      { label: 'Branco della Roccia Azzurra', href: '/lc/lupetti' },
      { label: 'Cerchio del Bosco Gioioso', href: '/lc/coccinelle' },
      { label: 'Piccole Orme', href: '/lc/piccole-orme' },
      { label: 'Specialità', href: '/lc/specialita' },
      { label: 'Iniziazione Cristiana', href: '/lc/ic' },
    ],
  },
  {
    label: 'Esploratori e Guide',
    children: [
      { label: 'La Branca E/G', href: '/eg' },
      { label: 'Reparto Brownsea', href: '/eg/brownsea' },
      { label: 'Reparto Antares', href: '/eg/antares' },
      { label: 'Campi di Specialità e Competenza', href: '/eg/campetti' },
      { label: 'Specialità e Competenze', href: '/eg/specialita' },
    ],
  },
  {
    label: 'Rover e Scolte',
    children: [
      { label: 'La Branca R/S', href: '/rs/' },
      { label: 'Clan Fuoco MdV', href: '/rs/mdv' },
      { label: 'Noviziato', href: '/rs/noviziato' },
      { label: 'Epppi/Ross', href: '/rs/epppi-ross' },
    ],
  },
  {
    label: 'Archivio',
    children: [
      { label: 'Archivio Totem', href: '/totem' },
      { label: 'Staff del Passato', href: '/archivio-staff' },
      { label: 'Campi e Route', href: '/archivio-campi-route' },
      { label: 'Foto e Video', href: '/media' },
    ],
  },
  {
    label: 'Utilities',
    children: [
      { label: 'Ricerca Codice Socio', href: '/codice-socio' },
      { label: 'Uniforme e Distintivi', href: '/uniforme' },
      { label: 'Traduttore Morse', href: '/morse' },
      { label: 'Generatore Alci', href: '/alci' },
      { label: 'Materiali e link', href: '/materiale' },
    ],
  },
]

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <main className="drawer-content flex flex-col min-h-screen">
        <HeaderNavbar>
          <div className="container max-w-none max-xl:px-5 xl:mx-auto flex items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                <Link href="/">
                  <Image
                    src="/img/graphics/logo_white.svg"
                    alt="logo"
                    width={64}
                    height={64}
                    className="h-16 -ml-3 xl:ml-0"
                  />
                </Link>
              </h1>
            </div>

            <div className="flex-none hidden xl:block">
              <ul className="menu menu-horizontal text-white">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <div className="dropdown dropdown-end dropdown-hover hover:text-[#dfd2ff]">
                        <label tabIndex={0}>{item.label}</label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-1 menu p-2 shadow bg-secondary text-white rounded-box w-60"
                        >
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link href={child.href!}>{child.label}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link href={item.href!} className="hover:text-[#dfd2ff]">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-none xl:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
        </HeaderNavbar>

        {children}
      </main>

      <div className="drawer-side min-h-full z-50">
        <label htmlFor="my-drawer-3" className="drawer-overlay" />
        <div className="flex flex-row min-h-full">
          <div className="bg-[#07ac0f] w-1" />
          <div className="bg-[#ffee18] w-1" />
          <div>
            <ul className="menu p-4 w-80 bg-secondary min-h-full overflow-y-scroll text-white">
              <Link href="/">
                <Image
                  src="/img/graphics/logo_white.svg"
                  alt=""
                  width={160}
                  height={96}
                  className="h-24 mb-8"
                />
              </Link>
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details>
                      <summary>{item.label}</summary>
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link href={child.href!}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href!} className="hover:text-secondary">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
