import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './App.css';

// Lazy load the pages
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const CompareProductsPage = lazy(() => import('./pages/CompareProductsPage'));

function App() {
  const [compareProducts, setCompareProducts] = useState([]);

  const addToCompare = (product) => {
    if (compareProducts.length < 4 && !compareProducts.some(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareProducts(compareProducts.filter(product => product.id !== productId));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow-sm min-h-[280px]">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <ProductDetails 
                        compareProducts={compareProducts} 
                        addToCompare={addToCompare} 
                      />
                    } 
                  />
                  <Route 
                    path="/compare" 
                    element={
                      <CompareProductsPage 
                        compareProducts={compareProducts} 
                        removeFromCompare={removeFromCompare} 
                        addToCompare={addToCompare}
                      />
                    } 
                  />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;