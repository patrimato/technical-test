import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductDetail, addToCart } from '../api/productApi'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import './ProductDetailPage.css'

function ProductDetailPage() {
  const { id } = useParams()
  const { updateCartCount } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedStorage, setSelectedStorage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProductDetail(id)
      .then((product) => {
        setProduct(product)
        setSelectedColor(product.options.colors[0]?.code)
        setSelectedStorage(product.options.storages[0]?.code)
      })
      .catch(() => {
        setError('Could not load product. Please try again.')
      })
  }, [id])

  const handleAddToCart = async () => {
    await addToCart({
      id,
      colorCode: selectedColor,
      storageCode: selectedStorage,
    })
    updateCartCount()
  }

  if (error) return <p className="plp-status plp-status--error">{error}</p>
  if (!product) return <p className="plp-status">Loading...</p>

  return (
    <div className="pdp-container">
      <Link to="/" className="pdp-back">
        ← Back to list
      </Link>

      <div className="pdp-layout">
        <div>
          <img
            className="pdp-image"
            src={product.imgUrl}
            alt={`${product.brand} ${product.model}`}
          />
        </div>

        <div>
          <h1 className="pdp-title">
            {product.brand} {product.model}
          </h1>
          <p
            className={`pdp-price ${!product.price ? 'pdp-price--unavailable' : ''}`}
          >
            {formatPrice(product.price)}
          </p>

          <div className="pdp-specs">
            <h2>Specifications</h2>
            <ul>
              {[
                { label: 'CPU', value: product.cpu },
                { label: 'RAM', value: product.ram },
                { label: 'OS', value: product.os },
                { label: 'Screen', value: product.displayResolution },
                { label: 'Battery', value: product.battery },
                { label: 'Cameras', value: product.primaryCamera?.join(', ') },
                { label: 'Dimensions', value: product.dimentions },
                { label: 'Weight', value: product.weight },
              ]
                .filter((spec) => spec.value)
                .map((spec) => (
                  <li key={spec.label}>
                    {spec.label}: {spec.value}
                  </li>
                ))}
            </ul>
          </div>

          <div className="pdp-options">
            <h2>Options</h2>
            <p>Storage:</p>
            <div className="pdp-option-buttons">
              {product.options.storages.map((storage) => (
                <button
                  key={storage.code}
                  className={`pdp-option-btn ${selectedStorage === storage.code ? 'pdp-option-btn--selected' : ''}`}
                  onClick={() => setSelectedStorage(storage.code)}
                >
                  {storage.name}
                </button>
              ))}
            </div>

            <p>Color:</p>
            <div className="pdp-option-buttons">
              {product.options.colors.map((color) => (
                <button
                  key={color.code}
                  className={`pdp-option-btn ${selectedColor === color.code ? 'pdp-option-btn--selected' : ''}`}
                  onClick={() => setSelectedColor(color.code)}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          <button className="pdp-add-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
