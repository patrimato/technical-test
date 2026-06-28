import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { cartCount } = useCart()

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