import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <span className="text-6xl">😊</span>
        <h1 className="text-3xl font-bold text-green-600 mt-4">Order Placed Successfully!</h1>
        <p className="text-gray-700 mt-2">Thank you for shopping with us! Your order is confirmed.</p>
        
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Orders
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
