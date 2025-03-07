import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../Context/CartContext";
import { server_url } from "../services/server_url";
import { placeOrder } from "../services/allAPIS";

const OrderPage = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("credit_card");
  const [address, setAddress] = useState("123 Main Street, City, Country");
  const [savedAddress, setSavedAddress] = useState(address);
  const { cartItems } = useContext(CartContext);

  // Calculate order total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 200 ? 0 : 10; // Free shipping for orders above $200
  const orderTotal = subtotal + shippingFee;

  const handleOrder =async () => {
    const orderDetails = {
      products: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        image: `${server_url}/uploads/${item.productImage}`,
      })),
      address: savedAddress,
      paymentMethod: selectedPayment,
      subtotal: subtotal.toFixed(2),
      shippingFee: shippingFee.toFixed(2),
      totalPrice: orderTotal.toFixed(2),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toDateString(),
    };
  
    console.log("Order Details:", orderDetails);
    const token = sessionStorage.getItem("token");

    if (token) {
               const reqHeader = { authorization: `Bearer ${token}` };
               const response = await placeOrder(orderDetails,reqHeader);
              if (response.status==201) {
                
                toast.success("Order placed successfully!");
              
                setTimeout(() => navigate("/order-success"), 1500);
              } else {
                toast.warn("Order failed")
              }
             }
  };
  

  const handleSaveAddress = () => {
    setSavedAddress(address);
    toast.success("Address saved!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-blue-700">Order Summary</h2>

      {/* Product Listing */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-700">Your Items</h3>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2 mt-2">
              <div className="flex items-center">
                <img
                  src={`${server_url}/uploads/${item.productImage}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-500 text-sm">₹{item.price} x {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-green-600">₹{item.price * item.quantity}</p>
            </div>
          ))
        ) : (
          <h1 className="text-red-500">Cart is empty</h1>
        )}
      </div>

      {/* Address Section */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Delivery Address</h3>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border-b-2 border-blue-500 bg-transparent outline-none"
          placeholder="Enter your address"
        />
        <button
          onClick={handleSaveAddress}
          className="mt-3 px-4 py-1 text-sm text-white bg-blue-600 hover:bg-blue-800 rounded transition"
        >
          Save Address
        </button>
      </div>

      {/* Payment Method */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Payment Method</h3>
        <div className="space-y-2">
          {["credit_card", "paypal", "gpay", "cod"].map((method) => (
            <label key={method} className="flex items-center gap-2 text-gray-600">
              <input
                type="radio"
                value={method}
                checked={selectedPayment === method}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="accent-blue-500"
              />
              {method === "credit_card" && "Credit Card"}
              {method === "paypal" && "PayPal"}
              {method === "gpay" && "Google Pay (GPay)"}
              {method === "cod" && "Cash on Delivery (COD)"}
            </label>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="border rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-700">Order Details</h3>
        <div className="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping Fee:</span>
          <span className={`font-medium ${shippingFee === 0 ? "text-green-500" : "text-red-500"}`}>
            {shippingFee === 0 ? "Free" : `₹${shippingFee.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-gray-800 text-xl font-bold">
          <span>Total:</span>
          <span className="text-green-600">₹{orderTotal.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Estimated delivery: 3-5 business days</p>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded mt-2 transition"
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="border px-4 py-2 rounded text-gray-700 hover:bg-gray-200 transition"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
