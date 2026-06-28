import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '../context/CartContext'

const TestComponent = () => {
  const { cartCount, updateCartCount } = useCart()
  return (
    <div>
      <span>Count: {cartCount}</span>
      <button onClick={updateCartCount}>Add</button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with count 0 when localStorage is empty', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('restores count from localStorage', () => {
    localStorage.setItem('cartCount', '5')
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    expect(screen.getByText('Count: 5')).toBeInTheDocument()
  })

  it('increments count and persists in localStorage', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
    expect(localStorage.getItem('cartCount')).toBe('1')
  })
})