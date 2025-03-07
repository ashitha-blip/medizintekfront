import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext";
import { server_url } from "../services/server_url";
import {
  deleteAProduct,
  updateProduct,
  viewBrands,
  viewCategories,
} from "../services/allAPIS";
import { toast, ToastContainer } from "react-toastify";
import { ProductContext } from "../Context/ProductContext";

function AdminViewProducts() {
  const { allProducts, fetchAllproducts } = useContext(ProductContext);

  const [editProduct, setEditProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setUpdatedProduct((prev) => ({ ...prev, productImage: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setEditProduct(product);
    setUpdatedProduct({ ...product });
    setImagePreview(`${server_url}/uploads/${product.productImage}`);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditProduct(null);
    setUpdatedProduct({});
    setImagePreview("");
  };

  const saveChanges = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized: Please log in.");
      return;
    }

    const reqHeader = { authorization: `Bearer ${token}` };
    const formData = new FormData();

    Object.keys(updatedProduct).forEach((key) => {
      if (key == "descriptions" || key == "specifications") {
        formData.append(key, JSON.stringify(updatedProduct[key]));
      } else {
        formData.append(key, updatedProduct[key]);
      }
    });

    console.log("Updated Product Data:", updatedProduct); // Debugging

    try {
      const result = await updateProduct(
        updatedProduct._id,
        // JSON.stringify(formData),
        formData,
        reqHeader
      );
      console.log("API Response:", result); // Debugging

      if (result.status === 200) {
        toast.success("Product updated successfully!");
        fetchAllproducts();
        closeEditModal();
      } else {
        toast.error("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("An error occurred while updating the product.");
    }
  };

  const handleDescriptionChange = (e, index) => {
    e.preventDefault();

    const newDescriptions = [...updatedProduct.descriptions];
    newDescriptions[index] = e.target.value;
    setUpdatedProduct({
      ...updatedProduct,
      descriptions: newDescriptions,
    });
  };

  const addDescription = (e) => {
    e.preventDefault();
    setUpdatedProduct({
      ...updatedProduct,
      descriptions: [...updatedProduct.descriptions, ""],
    });
  };
  const removeDescription = (e, index) => {
    e.preventDefault();

    const newDescriptions = [...updatedProduct.descriptions];
    newDescriptions.splice(index, 1);
    setUpdatedProduct({ ...updatedProduct, descriptions: newDescriptions });
  };
  const handleSpecificationChange = (e, index, field) => {
    e.preventDefault();

    const newSpecifications = [...updatedProduct.specifications];
    newSpecifications[index][field] = e.target.value;
    setUpdatedProduct({ ...updatedProduct, specifications: newSpecifications });
  };

  const addSpecification = (e) => {
    e.preventDefault();

    setUpdatedProduct({
      ...updatedProduct,
      specifications: [
        ...updatedProduct.specifications,
        { key: "", value: "" },
      ],
    });
  };

  const removeSpecification = (e, index) => {
    e.preventDefault();

    const newSpecifications = [...updatedProduct.specifications];
    newSpecifications.splice(index, 1);
    setUpdatedProduct({ ...updatedProduct, specifications: newSpecifications });
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = { authorization: `Bearer ${token}` };
      const result = await deleteAProduct(id, reqHeader);
      if (result.status === 200) {
        toast.success("Item deleted successfully");
        fetchAllproducts();
      } else {
        toast.warn("Item deletion failed");
      }
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
    <div className="  bg-white ">
      <h2 className="text-2xl font-bold text-center text-green-700">
        All Products
      </h2>
      <p className="text-teal-500 text-center font-medium m-2">
        Total Products&nbsp;:&nbsp;{allProducts.length}
      </p>

      {allProducts?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Quantity</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">
                    <img
                      src={`${server_url}/uploads/${product.productImage}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                    />
                  </td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.brand}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">
                    ${product.price}
                  </td>
                  <td className="px-4 py-3">{product.totalQuantity} units</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-gray-700 text-lg">
          No products are available
        </h1>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg max-h-[90vh] overflow-y-auto m-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Edit Product
            </h2>
            <form className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="totalQuantity"
                    value={updatedProduct.totalQuantity}
                    onChange={(e) => handleChange(e)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Category
                  </label>
                  <select
                  name='category'
                    value={updatedProduct.category}
                    onChange={(e) => handleChange(e)}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={updatedProduct.category}>
                      {updatedProduct.category}
                    </option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Brand
                  </label>

                  <select
                    value={updatedProduct.brand}
                    onChange={(e) => handleChange(e.target.value)}
                    required
                    className="w-full p-2 border rounded-md"
                  >
                    <option value={updatedProduct.brand}>
                      {updatedProduct.brand}
                    </option>
                    {brands.map((br, index) => (
                      <option key={index} value={br.brandName}>
                        {br.brandName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Descriptions
                  </label>
                  {updatedProduct.descriptions.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={desc}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        className="w-full p-2 border rounded-md"
                      />
                      <button
                        onClick={(e) => removeDescription(e, index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => addDescription(e)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    + Add Description
                  </button>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Specifications
                  </label>
                  {updatedProduct.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Key"
                        value={spec.key}
                        onChange={(e) =>
                          handleSpecificationChange(e, index, "key")
                        }
                        className="w-1/3 p-2 border rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecificationChange(e, index, "value")
                        }
                        className="w-2/3 p-2 border rounded-md"
                      />
                      <button
                        onClick={(e) => removeSpecification(e, index)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={(e) => addSpecification(e)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md"
                  >
                    + Add Specification
                  </button>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Change Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e)}
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
              </div>
              <div className="col-span-2 flex justify-end mt-4 gap-2">
                <button
                  onClick={(e) => saveChanges(e)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={closeEditModal}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default AdminViewProducts;
