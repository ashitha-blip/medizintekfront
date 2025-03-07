import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../services/allAPIS";
import OrderProgressBar from "../components/OrderProgressBar";

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }
      const reqHeader = { authorization: `Bearer ${token}` };
      const response = await getAllOrders(reqHeader);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700">Order History</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 shadow-md bg-white mb-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order._id}
              </h3>
              <span
                className={`px-3 py-1 text-sm rounded ${
                  order.status === "Delivered"
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Estimated Delivery: {order.estimatedDelivery}
            </p>
            <div className="flex justify-between text-gray-600 mt-2">
              <span>Items:</span>
              <span className="font-medium">{order.products.length}</span>
            </div>
            <div className="flex justify-between text-gray-800 text-xl font-bold">
              <span>Total Price:</span>
              <span className="text-green-600">
                ₹{order.totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Order Status Progress Bar */}
            <OrderProgressBar status={order.status}/>
            {/* <div className="mt-4">
              <div className="flex items-center justify-between w-full">
                {statusSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center w-1/5 text-center"
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${
                        order.status === step
                          ? "bg-blue-500"
                          : statusSteps.indexOf(order.status) > index
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {statusSteps.indexOf(order.status) > index
                        ? "✓"
                        : index + 1}
                    </div>
                    <span
                      className={`text-sm mt-1 ${
                        order.status === step
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div> */}

            <button
              className="w-full bg-black text-white py-2 rounded mt-2 transition hover:bg-gray-800"
              onClick={() =>
                setExpandedOrder(expandedOrder === order._id ? null : order._id)
              }
            >
              {expandedOrder === order._id ? "Hide Details" : "View Details"}
            </button>
            {expandedOrder === order._id && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-md font-semibold">Products</h4>
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2 mt-2"
                  >
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ₹{product.price} x {product.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">
                      ₹{product.total}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Subtotal:</span>
                  <span className="font-medium">
                    ₹{order.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee:</span>
                  <span className="font-medium text-red-500">
                    ₹{order.shippingFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-800 text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">
                    ₹{order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Delivery Address: {order.address}
                </p>
              </div>
            )}
          </div>
        ))
      ) : (
        <h1 className="text-center text-red-500">No Orders Found</h1>
      )}
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded transition mt-4"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ViewOrdersPage;
