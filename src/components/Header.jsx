import { Link, useLocation } from 'react-router-dom'

function Header({ cartCount }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header>
      <Link to="/">technical-test</Link>

      <nav>
        <span>
          <Link to="/">Home</Link>
          {!isHome && <span> / Product Detail</span>}
        </span>
      </nav>

      <span>Cart: {cartCount}</span>
    </header>
  )
}

export default Header