import { getFromCache, saveToCache } from './cache'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

export async function getProducts() {
  const cacheKey = 'products'
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch(`${BASE_URL}/api/product`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const data = await response.json()
    saveToCache(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export async function getProductDetail(id) {
  const cacheKey = `product-${id}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  try {
    const response = await fetch(`${BASE_URL}/api/product/${id}`)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const data = await response.json()
    saveToCache(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching product detail:', error)
    throw error
  }
}

export async function addToCart({ id, colorCode, storageCode }) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, colorCode, storageCode }),
    })
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    return response.json()
  } catch (error) {
    console.error('Error adding to cart:', error)
    throw error
  }
}
