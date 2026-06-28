import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProductListPage from '../pages/ProductListPage'
import * as productApi from '../api/productApi'

const mockProducts = [
  { id: '1', brand: 'Apple', model: 'iPhone 14', price: '999', imgUrl: '' },
  { id: '2', brand: 'Samsung', model: 'Galaxy S23', price: '799', imgUrl: '' },
  { id: '3', brand: 'Apple', model: 'iPhone 13', price: '799', imgUrl: '' },
]

vi.mock('../api/productApi')

describe('ProductListPage', () => {
  beforeEach(() => {
    productApi.getProducts.mockResolvedValue(mockProducts)
  })

  it('renders products from the API', async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    )
    expect(await screen.findByText('iPhone 14')).toBeInTheDocument()
    expect(await screen.findByText('Galaxy S23')).toBeInTheDocument()
  })

  it('filters products by brand or model', async () => {
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    )
    await screen.findByText('iPhone 14')
    fireEvent.change(screen.getByPlaceholderText('Search by brand or model'), {
      target: { value: 'Samsung' }
    })
    expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument()
    expect(screen.getByText('Galaxy S23')).toBeInTheDocument()
  })

  it('navigates to product detail when clicking a product', async () => {
    let testLocation
    render(
        <MemoryRouter>
        <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<div>Product Detail</div>} />
        </Routes>
        </MemoryRouter>
    )
    await screen.findByText('iPhone 14')
    fireEvent.click(screen.getByText('iPhone 14'))
    expect(await screen.findByText('Product Detail')).toBeInTheDocument()
  })
})