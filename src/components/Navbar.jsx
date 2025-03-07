import React, { useContext, useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { server_url } from "../services/server_url";
import { CartContext } from "../Context/CartContext";
import { getSearchResults } from "../services/allAPIS";
import ContactButton from "./ContactButton";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { userLoggedIn } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems]);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced Search API Call
  useEffect(() => {
    if (query.length > 1) {
      setLoading(true);
      const delayDebounce = setTimeout(async () => {
        const result = await getSearchResults(query);
        setSuggestions(result?.data || []);

        setLoading(false);
      }, 300);
      return () => clearTimeout(delayDebounce);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/medi.jpg"
                alt="Medizintek Logo"
                className="h-12 w-auto"
              />
              <span className="ml-2 text-xl font-semibold text-gray-700">
                Medizintek
              </span>
            </Link>

            {/* Search Bar */}
            <div className="relative hidden md:flex w-1/3 mx-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />

              {/* Search Suggestions */}
              {query.length > 1 && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg mt-2 p-2 z-10">
                  <ul className="max-h-64 overflow-y-auto">
                    {loading ? (
                      <li className="text-center py-3 text-gray-500">
                        Searching...
                      </li>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((product) => (
                        <li key={product._id}>
                          <Link
                            to={`/product-details/${product._id}`}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition"
                            onClick={() => setQuery("")}
                          >
                            <img
                              src={`${server_url}/uploads/${product.productImage}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-md mr-3"
                            />
                            <div>
                              <p className="text-gray-800 font-medium">
                                {product.name}
                              </p>
                              <p className="text-gray-600 font-semibold">
                                ${product.price}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="text-center py-3 text-gray-500">
                        No products found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink
                to="/"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-600 hover:text-gray-900 transition font-medium"
              >
                About
              </NavLink>
<ContactButton/>
              {/* Cart with Badge */}
              <NavLink
                to="/cart"
                className="relative text-gray-600 hover:text-gray-900 transition font-medium"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {userLoggedIn ? (
                <NavLink
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition font-medium"
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-gray-600 focus:outline-none"
              >
                {isOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col items-center space-y-3 py-4">
              <NavLink
                to="/"
                className="text-gray-700 hover:text-gray-900 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </NavLink>
              <NavLink
                to="/cart"
                className="relative text-gray-700 hover:text-gray-900 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              {userLoggedIn ? (
                <NavLink
                  to="/profile"
                  className="text-gray-700 hover:text-gray-900 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-10"></div>
    </>
  );
}

export default Navbar;
