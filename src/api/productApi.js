import { getFromCache, saveToCache } from './cache'

const BASE_URL = 'https://itx-frontend-test.onrender.com'

export async function getProducts() {
  const cacheKey = 'products'
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/api/product`)
  const data = await response.json()
  saveToCache(cacheKey, data)
  return data
}

export async function getProductDetail(id) {
  const cacheKey = `product-${id}`
  const cached = getFromCache(cacheKey)
  if (cached) return cached

  const response = await fetch(`${BASE_URL}/api/product/${id}`)
  const data = await response.json()
  saveToCache(cacheKey, data)
  return data
}

export async function addToCart({ id, colorCode, storageCode }) {
  const response = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, colorCode, storageCode })
  })
  return response.json()
}