import React, { useContext, useEffect, useRef, useState } from "react";
import { addProductAPI, viewBrands, viewCategories } from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";
import { ProductContext } from "../Context/ProductContext";

const ProductAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [descriptions, setDescriptions] = useState([""]);
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const fileInputRef = useRef(null); // Reference for file input
  const { fetchAllproducts } = useContext(ProductContext);
  // const brands = [
  //   "Romsons",
  //   "Polymed",
  //   "Coloplast",
  //   "3M",
  //   "CR Morepen",
  //   "Adlisc",
  //   "Others",
  // ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const addDescriptionField = () => {
    setDescriptions([...descriptions, ""]);
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecifications = [...specifications];
    newSpecifications[index][field] = value;
    setSpecifications(newSpecifications);
  };

  const addSpecificationField = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("totalQuantity", totalQuantity);
    productData.append("category", category); // Fixed this line
    productData.append("brand", brand);
    productData.append("descriptions", JSON.stringify(descriptions));
    productData.append("specifications", JSON.stringify(specifications));

    if (image) {
      productData.append("productImage", image);
    }

    const reqHeader = {
      "Content-Type": "multipart/form-data",
    };

    const result = await addProductAPI(productData, reqHeader);
    console.log(result, "RREESSULLT");
    if (result.status == 201) {
      toast.success(result.data.message);
      setName("");
      setPrice("");
      setTotalQuantity("");
      setCategory("");
      setBrand("");
      setDescriptions([""]);
      setSpecifications([{ key: "", value: "" }]);
      setImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchAllproducts();
    } else {
      toast.error(result.data.message);
    }
  };

  const fetchCategories = async (reqHeader) => {
    try {
      const response = await viewCategories(reqHeader);
      if (response.status === 200) {
        // console.log(response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchBrands = async (reqHeader) => {
    try {
      const response = await viewBrands(reqHeader);
      if (response.status === 200) {
        setBrands(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }

    const reqHeader = { authorization: `Bearer ${token}` };
    fetchCategories(reqHeader);
    fetchBrands(reqHeader);
    console.log("brands,categories", brands, categories);
  }, []);

  return (
    // <div className="  bg-white scroll-smooth max-h-[90vh] overflow-y-auto">
    <div className="  ">
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Total Quantity
            </label>
            <input
              type="number"
              value={totalQuantity}
              onChange={(e) => setTotalQuantity(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            {/* <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a category</option>
              <option value="Baby Skin Care Products">
                Baby Skin Care Products
              </option>
              <option value="Home and Personal Protection">
                Home and Personal Protection
              </option>
              <option value="Digital Instruments">Digital Instruments</option>
              <option value="Gauze Products">Gauze Products</option>
              <option value="Urology Care">Urology Care</option>
              <option value="Syringe & Needles">Syringe & Needles</option>
              <option value="Surgical Care">Surgical Care</option>
              <option value="Critical Care">Critical Care</option>
              <option value="Others">Others</option>
            </select> */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Brand</label>
            {/* <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a brand</option>
              {brands.map((br, index) => (
                <option key={index} value={br[1]}>
                  {br[1]}
                </option>
              ))}
            </select> */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a brand</option>
              {brands.map((br, index) => (
                <option key={index} value={br.brandName}>
                  {br.brandName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Product Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Descriptions
            </label>
            {descriptions.map((desc, index) => (
              <input
                key={index}
                type="text"
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />
            ))}
            <button
              type="button"
              onClick={addDescriptionField}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              + Add Description
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Specifications
            </label>
            {specifications.map((spec, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={spec.key}
                  onChange={(e) =>
                    handleSpecificationChange(index, "key", e.target.value)
                  }
                  className="w-1/3 p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecificationChange(index, "value", e.target.value)
                  }
                  className="w-2/3 p-2 border rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSpecificationField}
              className="bg-green-500 text-white px-3 py-1 rounded-md"
            >
              + Add Specification
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Add Product
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ProductAdd;
