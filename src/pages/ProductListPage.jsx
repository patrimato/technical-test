import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../api/productApi'
import './ProductListPage.css'

const PRODUCTS_PER_PAGE = 8

function ProductListPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  const filteredProducts = products.filter(product =>
    `${product.brand} ${product.model}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="plp-container">
      <input
        type="text"
        className="plp-search"
        placeholder="Search by brand or model"
        value={search}
        onChange={handleSearch}
      />

      <div className="plp-grid">
        {paginatedProducts.map(product => (
          <div key={product.id} className="plp-card" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
            <p>{product.brand}</p>
            <p>{product.model}</p>
            <p>{product.price} €</p>
          </div>
        ))}
      </div>

      <div className="plp-pagination">
        <button
            onClick={() => setCurrentPage(prev => prev - 1)}
            disabled={currentPage === 1}
        >
            ←
        </button>

        <button
            onClick={() => setCurrentPage(1)}
            className={currentPage === 1 ? 'plp-pagination__active' : ''}
        >
            1
        </button>

        {currentPage > 3 && <span>...</span>}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => page !== 1 && page !== totalPages && Math.abs(page - currentPage) <= 1)
            .map(page => (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'plp-pagination__active' : ''}
            >
                {page}
            </button>
            ))}

        {currentPage < totalPages - 2 && <span>...</span>}

        <button
            onClick={() => setCurrentPage(totalPages)}
            className={currentPage === totalPages ? 'plp-pagination__active' : ''}
        >
            {totalPages}
        </button>

        <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === totalPages}
        >
            →
        </button>
      </div>
    </div>
  )
}

export default ProductListPage