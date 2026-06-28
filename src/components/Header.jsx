import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { cartCount } = useCart()

  return (
    <header className="header">
      <Link to="/" className="header__logo">MobileStore</Link>

      <nav className="header__breadcrumb">
        <Link to="/">Home</Link>
        {!isHome && <span> / Product Detail</span>}
      </nav>

      <span className="header__cart">🛒 {cartCount}</span>
    </header>
  )
}

export default Header