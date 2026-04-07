import { useEffect, useId, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

/* Stable Unsplash hotlink (verified id + fm) */
const LOGO_MARK =
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?fm=jpg&auto=format&fit=crop&w=160&h=160&q=85'

const MENU_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'My Services' },
  { to: '/contact', label: 'Contact' },
]

export default function FloatingChrome() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelId = useId()

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(false))
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="floating-chrome" role="banner">
        <NavLink
          to="/"
          className="floating-chrome__logo-link"
          aria-label="Jackline Achieng — Home"
          end
        >
          <img
            className="floating-chrome__logo"
            src={LOGO_MARK}
            alt=""
            width={48}
            height={48}
            decoding="async"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </NavLink>

        <button
          type="button"
          className={`floating-chrome__menu-btn${open ? ' floating-chrome__menu-btn--open' : ''}`}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="floating-chrome__hamburger" aria-hidden="true">
            <span className="floating-chrome__hamburger-line" />
            <span className="floating-chrome__hamburger-line" />
            <span className="floating-chrome__hamburger-line" />
          </span>
        </button>
      </header>

      <div
        className={`floating-chrome__overlay${open ? ' floating-chrome__overlay--open' : ''}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="floating-chrome__backdrop"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <nav
          id={panelId}
          className="floating-chrome__panel"
          aria-label="Site"
          aria-hidden={!open}
        >
          <ul className="floating-chrome__list">
            {MENU_LINKS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={Boolean(item.end)}
                  className={({ isActive }) =>
                    `floating-chrome__link${isActive ? ' floating-chrome__link--active' : ''}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
