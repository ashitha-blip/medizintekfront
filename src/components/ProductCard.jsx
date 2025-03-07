import React from 'react'
import { server_url } from '../services/server_url'

function ProductCard({product}) {
  return (
    <div>              <div
    key={product._id}
    className="bg-white rounded-lg shadow-lg p-4 transition-transform hover:scale-105"
  >
    <img
      src={`${server_url}/uploads/${product.productImage}`}
      alt={product.name}
      className="w-full h-40 object-cover rounded-lg"
    />
    <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
    <p className="text-gray-600">💰 Price: ₹{product.price}</p>
    <p className="text-gray-500">🏭 Brand: {product.brand}</p>
  </div></div>
  )
}

export default ProductCard