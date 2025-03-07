import React from "react";
import { FaClock, FaCog, FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrderProgressBar = ({ status }) => {
    const steps = [
        { label: "Pending", icon: <FaClock /> },      // Pending status
        { label: "Processing", icon: <FaCog /> },    // Processing status
        { label: "Shipped", icon: <FaShippingFast /> },  // Shipped status
        { label: "Delivered", icon: <FaCheckCircle /> }, // Delivered status
        { label: "Cancelled", icon: <FaTimesCircle /> }, // Cancelled status
      ];
  const currentStep = steps.findIndex((step) => step.label === status);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="relative flex justify-between items-center mt-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-1/4">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              }`}
            >
              {index <= currentStep ? <FaCheckCircle /> : step.icon}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                index <= currentStep ? "text-green-500" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Connecting line */}
      <div className="absolute top-[40px] left-0 w-full h-1 bg-gray-300 -z-10">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OrderProgressBar;
