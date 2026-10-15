import Link from 'next/link'
import Image from 'next/image'
import HeaderNavbar from './HeaderNavbar'
import NavLink from './NavLink'
import { DRAWER_ID, menuItems, utilityItems } from './navigation'
import { CaretDown, List, Toolbox, X } from '@phosphor-icons/react/ssr'

const activeLink = 'aria-[current=page]:bg-white/15 aria-[current=page]:font-bold'

// daisyUI speed dial, anchored to the navbar instead of the screen corner and opening downwards
function UtilitiesFab() {
  return (
    <div className="relative size-10 flex-none">
      <div className="fab absolute top-0 end-0 bottom-auto flex-col [&_.fab-close]:top-0 [&_.fab-close]:bottom-auto">
        <div
          tabIndex={0}
          role="button"
          className="size-10 place-items-center rounded-field cursor-pointer text-white hover:bg-black/10 hover:text-[#dfd2ff]"
          aria-label="Utilità"
        >
          <Toolbox size={26} weight="bold" aria-hidden />
        </div>
        <div className="fab-close">
          <span className="btn btn-circle bg-white text-secondary border-0 shadow-lg" aria-label="Chiudi">
            <X size={20} weight="bold" aria-hidden />
          </span>
        </div>
        {utilityItems.map(({ label, href, icon: Icon }) => (
          <NavLink key={href} href={href} className="group">
            <span className="rounded-full bg-secondary text-white px-3 py-1 shadow-lg group-hover:bg-[#dfd2ff] group-hover:text-secondary group-aria-[current=page]:font-bold">
              {label}
            </span>
            <span className="btn btn-circle bg-secondary text-white border-0 shadow-lg group-hover:bg-[#dfd2ff] group-hover:text-secondary">
              <Icon size={22} aria-hidden />
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer drawer-end">
      <input id={DRAWER_ID} type="checkbox" className="drawer-toggle" aria-label="Apri il menu" />
      <div className="drawer-content flex flex-col min-h-screen">
        <HeaderNavbar>
          <div className="container max-w-none max-xl:pl-5 max-xl:pr-0 xl:mx-auto flex items-center gap-1">
            <div className="flex-1">
              <Link href="/" aria-label="Home - Scout Mirandola 2" className="inline-block">
                <Image
                  src="/img/graphics/logo_white.svg"
                  alt="Logo Scout Mirandola 2"
                  width={64}
                  height={64}
                  className="h-16 -ml-3 xl:ml-0"
                />
              </Link>
            </div>

            <nav className="flex-none hidden xl:block" aria-label="Menu principale">
              <ul className="menu menu-horizontal gap-1 text-white">
                {menuItems.map((item, i) => {
                  if (!item.children) {
                    return (
                      <li key={item.label}>
                        <NavLink href={item.href!} className={`hover:text-[#dfd2ff] ${activeLink}`}>
                          {item.label}
                        </NavLink>
                      </li>
                    )
                  }
                  // Menus open to the right, except the last ones which would overflow the screen
                  const alignEnd = i >= menuItems.length - 2
                  return (
                    <li key={item.label}>
                      <div className={`dropdown dropdown-hover hover:text-[#dfd2ff] ${alignEnd ? 'dropdown-end' : 'dropdown-start'}`}>
                        <div tabIndex={0} role="button" className="flex items-center gap-1">
                          {item.label}
                          <CaretDown size={14} weight="bold" className="opacity-70" aria-hidden />
                        </div>
                        <ul
                          tabIndex={0}
                          className={`dropdown-content z-10 menu ms-0 before:hidden animate-none transition-none p-2 shadow-xl bg-secondary text-white rounded-box w-64 ${
                            alignEnd ? '' : 'start-0'
                          }`}
                        >
                          {item.children.map(child => (
                            <li key={child.label}>
                              <NavLink href={child.href!} className={`hover:bg-white/10 ${activeLink}`}>
                                {child.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <UtilitiesFab />
          </div>

          <div className="flex-none xl:hidden">
            <label htmlFor={DRAWER_ID} className="btn btn-square btn-ghost hover:bg-white/10 border-0" aria-label="Apri il menu">
              <List size={26} weight="bold" aria-hidden />
            </label>
          </div>
        </HeaderNavbar>

        {children}
      </div>

      <div className="drawer-side z-50">
        <label htmlFor={DRAWER_ID} className="drawer-overlay" aria-label="Chiudi il menu" />
        <div className="flex flex-row min-h-full">
          <div className="bg-[#07ac0f] w-1" />
          <div className="bg-[#ffee18] w-1" />
          <nav aria-label="Menu principale" className="w-80 min-h-full bg-secondary text-white">
            <Link href="/" className="block p-4 pb-0">
              <Image src="/img/graphics/logo_white.svg" alt="Home" width={160} height={96} className="h-24 mb-6" />
            </Link>
            <ul className="menu w-full p-4 pt-0">
              {menuItems.map(item => (
                <li key={item.label}>
                  {item.children ? (
                    <details>
                      <summary className="hover:bg-white/10">{item.label}</summary>
                      <ul>
                        {item.children.map(child => (
                          <li key={child.label}>
                            <NavLink href={child.href!} className={`hover:bg-white/10 ${activeLink}`}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink href={item.href!} className={`hover:bg-white/10 ${activeLink}`}>
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
