import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Header from '../components/Header'

const renderHeader = (route = '/') => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProvider>
        <Header />
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Header', () => {
  it('renders the logo', () => {
    renderHeader()
    expect(screen.getByText('MobileStore')).toBeInTheDocument()
  })

  it('shows Home in breadcrumb on the list page', () => {
    renderHeader('/')
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('shows Product Detail in breadcrumb on the detail page', () => {
    renderHeader('/product/123')
    expect(screen.getByText('/ Product Detail')).toBeInTheDocument()
  })

  it('shows cart count', () => {
    renderHeader()
    expect(screen.getByText('🛒 0')).toBeInTheDocument()
  })
})
