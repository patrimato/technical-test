import { describe, it, expect, beforeEach } from 'vitest'
import { getFromCache, saveToCache } from '../api/cache'

describe('cache', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when cache is empty', () => {
    expect(getFromCache('test')).toBeNull()
  })

  it('saves and retrieves data from cache', () => {
    const data = [{ id: '1', brand: 'Apple' }]
    saveToCache('products', data)
    expect(getFromCache('products')).toEqual(data)
  })

  it('returns null when cache is expired', () => {
    const data = [{ id: '1', brand: 'Apple' }]
    const expiredEntry = {
      data,
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    }
    localStorage.setItem('products', JSON.stringify(expiredEntry))
    expect(getFromCache('products')).toBeNull()
  })
})
