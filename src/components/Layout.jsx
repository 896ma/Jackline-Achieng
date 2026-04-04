import { Outlet } from 'react-router-dom'
import FloatingChrome from './FloatingChrome'
import Footer from './Footer'

function Layout() {
  return (
    <div className="site-shell">
      <FloatingChrome />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
