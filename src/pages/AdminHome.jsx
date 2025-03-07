import React, { useContext, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  Menu, X, Home, Boxes, Plus, Tag, List, Users, ShoppingBag, LogOut 
} from "lucide-react";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";

function AdminHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { setIsAdminLogged } = useContext(UserContext);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "View Products", path: "/admin/view-products", icon: <Boxes size={20} /> },
    { name: "Add Product", path: "/admin/add-product", icon: <Plus size={20} /> },
    { name: "View Brands", path: "/admin/view-brands", icon: <Tag size={20} /> },
    { name: "View Categories", path: "/admin/view-categories", icon: <List size={20} /> },
    { name: "View Users", path: "/admin/view-users", icon: <Users size={20} /> },
    { name: "View Orders", path: "/admin/view-orders", icon: <ShoppingBag size={20} /> },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");
    toast.success("Logged out successfully!");
    setIsAdminLogged(false);
    navigate("/login");
  };

  return (
    <div className="flex bg-gray-100 h-screen">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white shadow-md flex flex-col justify-between transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className={`text-xl font-bold text-gray-700 transition-all duration-300 ${
                !isSidebarOpen && "hidden"
              }`}>
              Admin Panel
            </h2>
            <button
              className="p-2 rounded-md text-gray-700 hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <nav className="mt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 my-1 text-gray-700 font-medium hover:bg-green-100 rounded-lg transition ${
                    isActive ? "bg-green-200 text-green-700" : ""
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className={`${!isSidebarOpen && "hidden"}`}>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center py-3 bg-red-600 hover:bg-red-800 text-white font-medium transition rounded-lg m-4"
        >
          <LogOut size={20} className="mr-2" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div 
        className={`flex-1 ml-64 p-5 overflow-y-auto h-screen transition-all duration-300 ${
          !isSidebarOpen && "ml-20"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;
