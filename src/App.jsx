import { Routes, Route } from 'react-router-dom'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header cartCount={0} />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </>
  )
}

export default App