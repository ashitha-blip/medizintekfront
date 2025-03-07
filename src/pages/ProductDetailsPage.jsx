import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, getProductDetails } from "../services/allAPIS";
import { server_url } from "../services/server_url";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../Context/CartContext";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const userId = sessionStorage.getItem("existing_User_Id");

const{fetchCartItems}=useContext(CartContext)
  const fetchProductDetails = async () => {
    try {
      const productDetails = await getProductDetails(id);
      console.log("Fetched Product:", productDetails);
      setProduct(productDetails.data[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const cartFunction = async () => {
    const id=product._id
    const productData = {
      productId: id,
      quantity: 1,
    };
console.log(productData,"prodcutData in fe");

    const token = sessionStorage.getItem("token");
    if(token){
    const reqHeader = {
      authorization: `Bearer ${token}`,
    };
    const result = await addToCart(productData,reqHeader);
    if(result.status==200){
      toast.success("Product added to cart")
      fetchCartItems()
    }else{toast.warn("Product add to cart is failed!")}
    console.log("result", result.data);
  }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-600">Loading product details...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 ">
      {/* Product Container */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={`${server_url}/uploads/${product.productImage}`}
            alt={product.name}
            className="w-80 h-80 object-contain border-r-2 border-gray-600 pr-20"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl font-semibold text-gray-700">
          ₹{product.price}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-600">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="text-gray-600">
            <strong>Total Quantity:</strong> {product.totalQuantity}
          </p>

          {/* Descriptions */}
          {product?.descriptions?.length > 0 && (
            <div>
              <strong>Descriptions:</strong>
              <ul className="list-disc ml-5 text-gray-600">
                {product.descriptions.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product?.specifications?.length > 0 && (
            <div>
              <strong>Specifications:</strong>
              <ul className="list-disc ml-5 text-gray-600">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <strong>{spec.key}:</strong> {spec.value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={()=>cartFunction()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center"/>
    </div>
  );
};

export default ProductDetailsPage;
