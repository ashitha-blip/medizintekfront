import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-700">Medizintek</h3>
          <p className="mt-2 text-sm">
            Your trusted partner in medical supplies and healthcare solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600">Products</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-600">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="mt-2 text-sm">Email: support@medizintek.com</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Location: 123 Healthcare St, MedCity</p>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t pt-4">
        &copy; {new Date().getFullYear()} Medizintek. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
