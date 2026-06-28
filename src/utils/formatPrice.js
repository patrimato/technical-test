export function formatPrice(price) {
  if (!price) return 'Price not available'
  return `${Number(price)} €`
}
