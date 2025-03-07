import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  getCartItems,
  removeCartItem,
  updateCartItem,
} from "../services/allAPIS";
import { server_url } from "../services/server_url";
import { toast, ToastContainer } from "react-toastify";
import { CartContext } from "../Context/CartContext";

function CartPage() {
  const [cart, setCart] = useState({ products: [], totalPrice: 0 });
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchCartItems } = useContext(CartContext);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // setLoading(true);
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = { authorization: `Bearer ${token}` };
        const response = await getCartItems(reqHeader);
        setCart(response.data || { products: [], totalPrice: 0 });
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    console.log(productId._id);

    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = { authorization: `Bearer ${token}` };
        const reqBody = {
          productId: productId._id,
        };
        const result = await removeCartItem(reqBody, reqHeader);
        if (result.status === 200) {
          toast.success("Item removed from cart");
          fetchCart();
          fetchCartItems();
        }
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = { authorization: `Bearer ${token}` };
        const reqbody = {
          quantity: quantity,
        };
        const result = await updateCartItem(productId._id, reqbody, reqHeader);
        fetchCart();
        fetchCartItems()
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleClearCart = async () => {
    const token = sessionStorage.getItem("token");
if(token){
    const reqHeader = { authorization: `Bearer ${token}` };
    const cartId = cart._id;
    console.log(cartId);
    
    const result = await clearCart(cartId, reqHeader);
    if (result.status == 200) {
      fetchCart()
      fetchCartItems();
      toast.success("Cart cleared");
    } else {
      toast.warn("Cart clearing failed!");
    }}
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h2>
      {
      // loading ? (
      //   <p className="text-center">Loading cart...</p>
      // ) :
       cart.products.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cart.products.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img
                  src={`${server_url}/uploads/${item.productImage}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-2 py-1 bg-gray-300 rounded-l"
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-white border">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded-r"
                      onClick={() =>
                        handleUpdateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total: ₹{cart.totalPrice.toFixed(2)}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate("/orderpage")}
              className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 w-1/2 mr-2"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-700 w-1/2 text-center"
            >
              Add More
            </Link>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
