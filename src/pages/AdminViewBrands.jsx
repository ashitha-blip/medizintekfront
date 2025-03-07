import React, { useEffect, useState, useRef } from "react";
import { addNewBrand, deleteBrand, viewBrands, updateBrand } from "../services/allAPIS";
import { toast } from "react-toastify";
import { server_url } from "../services/server_url";

function AdminViewBrands() {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    brandName: "",
    about: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null); // Track brand being edited
  const fileInputRef = useRef(null);

  const token = sessionStorage.getItem("token");
  if (!token) {
    toast.error("Unauthorized: Please log in.");
    return;
  }

  const reqHeader = { authorization: `Bearer ${token}` };

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      const response = await viewBrands(reqHeader);
      if (response.status === 200) {
        setBrands(response.data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit (Add or Edit brand)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("brandName", formData.brandName);
    data.append("about", formData.about);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingBrand) {
        // Update existing brand
        const response = await updateBrand(editingBrand._id, data, reqHeader);
        if (response.status === 200) {
          toast.success("Brand updated successfully!");
        }
      } else {
        // Add new brand
        const response = await addNewBrand(data, reqHeader);
        if (response.status === 201) {
          toast.success("Brand added successfully!");
        }
      }

      // Refresh brands & reset form
      fetchBrands();
      setFormData({ brandName: "", about: "", image: null });
      setImagePreview(null);
      setEditingBrand(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error saving brand:", error);
    }
  };

  // Handle edit action
  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      brandName: brand.brandName,
      about: brand.about,
      image: null, // Reset image so new selection is needed
    });
    setImagePreview(`${server_url}/uploads/${brand.image}`);
  };

  // Handle delete brand
  const handleDelete = async (id) => {
    try {
      const response = await deleteBrand(id, reqHeader);
      if (response.status === 200) {
        toast.success("Brand deleted successfully!");
        fetchBrands();
      }
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Brands</h2>

      {/* Add / Edit Brand Form */}
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-3">{editingBrand ? "Edit Brand" : "Add New Brand"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="brandName"
            placeholder="Brand Name"
            value={formData.brandName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="about"
            placeholder="About the Brand"
            value={formData.about}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {/* Show Image Preview */}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded" />
          )}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            {editingBrand ? "Update Brand" : "Add Brand"}
          </button>
          {editingBrand && (
            <button
              type="button"
              onClick={() => {
                setEditingBrand(null);
                setFormData({ brandName: "", about: "", image: null });
                setImagePreview(null);
              }}
              className="bg-gray-500 text-white p-2 rounded w-full mt-2"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* Brands Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Brand Name</th>
              <th className="py-2 px-4 border">About</th>
              <th className="py-2 px-4 border">Product Count</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.length > 0 ? (
              brands.map((brand) => (
                <tr key={brand._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">
                    <img
                      src={`${server_url}/uploads/${brand.image}`}
                      alt={brand.brandName}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border text-center">{brand.brandName}</td>
                  <td className="py-2 px-4 border text-center">{brand.about}</td>
                  <td className="py-2 px-4 border text-center">{brand.productCount || 0}</td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="bg-yellow-500 text-white p-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand._id)}
                      className="bg-red-500 text-white p-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">No brands found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminViewBrands;
