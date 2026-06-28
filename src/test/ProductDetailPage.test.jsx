import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import ProductDetailPage from '../pages/ProductDetailPage'
import * as productApi from '../api/productApi'

const mockProduct = {
  id: '1',
  brand: 'Apple',
  model: 'iPhone 14',
  price: '999',
  imgUrl: '',
  cpu: 'A15 Bionic',
  ram: '6 GB',
  os: 'iOS 16',
  displayResolution: '6.1 inches',
  battery: '3279 mAh',
  primaryCamera: ['12 MP', 'autofocus'],
  dimentions: '146.7 x 71.5 x 7.8 mm',
  weight: '172',
  options: {
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
    ],
    storages: [
      { code: 1, name: '128 GB' },
      { code: 2, name: '256 GB' },
    ],
  },
}

vi.mock('../api/productApi')

const renderDetail = () => {
  return render(
    <MemoryRouter initialEntries={['/product/1']}>
      <CartProvider>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  )
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    productApi.getProductDetail.mockResolvedValue(mockProduct)
    productApi.addToCart.mockResolvedValue({ count: 1 })
  })

  it('renders product name and price', async () => {
    renderDetail()
    expect(await screen.findByText('Apple iPhone 14')).toBeInTheDocument()
    expect(screen.getByText('999 €')).toBeInTheDocument()
  })

  it('renders product specifications', async () => {
    renderDetail()
    expect(await screen.findByText('CPU: A15 Bionic')).toBeInTheDocument()
    expect(screen.getByText('RAM: 6 GB')).toBeInTheDocument()
  })

  it('renders color and storage selectors', async () => {
    renderDetail()
    expect(await screen.findByText('Black')).toBeInTheDocument()
    expect(screen.getByText('128 GB')).toBeInTheDocument()
  })

  it('calls addToCart when button is clicked', async () => {
    renderDetail()
    await screen.findByText('Apple iPhone 14')
    fireEvent.click(screen.getByText('Add to cart'))
    await waitFor(() => {
      expect(productApi.addToCart).toHaveBeenCalledWith({
        id: '1',
        colorCode: 1,
        storageCode: 1,
      })
    })
  })

  it('shows price not available when price is missing', async () => {
    productApi.getProductDetail.mockResolvedValue({
      ...mockProduct,
      price: null,
    })
    renderDetail()
    expect(await screen.findByText('Price not available')).toBeInTheDocument()
  })

  it('has first color and storage selected by default', async () => {
    renderDetail()
    await screen.findByText('Apple iPhone 14')
    expect(screen.getByText('Black').className).toContain('selected')
    expect(screen.getByText('128 GB').className).toContain('selected')
  })
})
