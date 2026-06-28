const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export function getFromCache(key) {
  const cached = localStorage.getItem(key)
  if (!cached) return null

  const { data, timestamp } = JSON.parse(cached)
  const isExpired = Date.now() - timestamp > CACHE_DURATION

  if (isExpired) {
    localStorage.removeItem(key)
    return null
  }

  return data
}

export function saveToCache(key, data) {
  const entry = {
    data,
    timestamp: Date.now()
  }
  localStorage.setItem(key, JSON.stringify(entry))
}