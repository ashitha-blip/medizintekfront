import React, { useContext, useState } from "react";
import { loginAPI } from "../services/allAPIS";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../Context/UserContext";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setLoggedUser, setUserLoggedIn } = useContext(UserContext);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Invalid email";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.info("Please fill missing fileds");
    } else {
      if (validateForm()) {
        const result = await loginAPI(formData);
        if (result.status == 200) {
          sessionStorage.setItem(
            "existing_User_Id",
            result.data.existingUser._id
          );
          sessionStorage.setItem("token", result.data.token);
          toast.success("Login SuccessFull");

          setLoggedUser(result.data.existingUser);
          setUserLoggedIn(true);
          navigate("/");
        } else {
          toast.warn("Login Faild! Invalid email or password");
        }
      }
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center  w-full">
      <div className="flex flex-col md:flex-row shadow-lg">
        {/* Left Section */}
        <div className="md:w-1/2 flex flex-col justify-center items-center bg-blue-600 text-white p-10 relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/800x600/?medical,hospital')",
            }}
          ></div>
          <div className="relative text-center">
            <h1 className="text-4xl font-bold">Medizintek</h1>
            <p className="mt-2 text-sm">Your Trusted Medical Partner</p>
            <p className="mt-2 text-md font-medium">Login Here</p>
          </div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="md:w-1/2 flex justify-center items-center p-5">
          <div className="w-full max-w-md px-6 py-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your password"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700"
              >
                Login
              </button>
            </form>   

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to={'/register'} className="text-blue-500 cursor-pointer">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
