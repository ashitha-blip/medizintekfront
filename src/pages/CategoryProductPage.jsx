import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoryProducts } from "../services/allAPIS";
import { server_url } from "../services/server_url";

function CategoryProductPage() {
  const [products, setProdutcs] = useState([]);
  const { c } = useParams();
  const fetchCategoryProduct = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getCategoryProducts(c, reqHeader);
      console.log("result", result.data);
      setProdutcs(result.data);
    }
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, [c]);
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {c}
        </h2>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <Link to={`/product-details/${product._id}`}>
                <img
                  src={`${server_url}/uploads/${product.productImage}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">Brand: {product.brand}</p>
                <p className="text-blue-600 font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-gray-500 text-sm truncate">
                  {product.descriptions[0] || "No description available"}
                </p>

                {/* View Details Button */}
                <Link
                  to={`/product-details/${product._id}`}
                  className="block mt-4 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProductPage;
