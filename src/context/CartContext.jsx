import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(() => {
    const saved = localStorage.getItem('cartCount')
    return saved ? Number(saved) : 0
  })

  const updateCartCount = () => {
    setCartCount((prev) => {
      const newCount = prev + 1
      localStorage.setItem('cartCount', newCount)
      return newCount
    })
  }

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
