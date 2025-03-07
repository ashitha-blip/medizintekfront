import React, { useEffect, useState, useRef } from "react";
import { addNewCategory, deleteCategory, viewCategories, updateCategory } from "../services/allAPIS";
import { toast } from "react-toastify";
import { server_url } from "../services/server_url";

function AdminViewCategories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const fileInputRef = useRef(null);

  const token = sessionStorage.getItem("token");
  if (!token) {
    toast.error("Unauthorized: Please log in.");
    return;
  }

  const reqHeader = { authorization: `Bearer ${token}` };

  const fetchCategories = async () => {
    try {
      const response = await viewCategories(reqHeader);
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryName", formData.categoryName);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingCategory) {
        const response = await updateCategory(editingCategory._id, data, reqHeader);
        if (response.status === 200) {
          toast.success("Category updated successfully!");
        }
      } else {
        const response = await addNewCategory(data, reqHeader);
        if (response.status === 201) {
          toast.success("Category added successfully!");
        }
      }
      fetchCategories();
      setFormData({ categoryName: "", description: "", image: null });
      setImagePreview(null);
      setEditingCategory(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      categoryName: category.categoryName,
      description: category.description,
      image: null,
    });
    setImagePreview(`${server_url}/uploads/${category.image}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCategory(id, reqHeader);
      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-3">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="categoryName" placeholder="Category Name" value={formData.categoryName} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="w-full p-2 border rounded" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded" />}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">{editingCategory ? "Update Category" : "Add Category"}</button>
          {editingCategory && <button type="button" onClick={() => { setEditingCategory(null); setFormData({ categoryName: "", description: "", image: null }); setImagePreview(null); }} className="bg-gray-500 text-white p-2 rounded w-full mt-2">Cancel Edit</button>}
        </form>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Category Name</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? categories.map((category) => (
              <tr key={category._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 border text-center"><img src={`${server_url}/uploads/${category.image}`} alt={category.categoryName} className="h-16 w-16 object-cover rounded" /></td>
                <td className="py-2 px-4 border text-center">{category.categoryName}</td>
                <td className="py-2 px-4 border text-center">{category.description}</td>
                <td className="py-2 px-4 border text-center">
                  <button onClick={() => handleEdit(category)} className="bg-yellow-500 text-white p-1 px-2 rounded mr-2">Edit</button>
                  <button onClick={() => handleDelete(category._id)} className="bg-red-500 text-white p-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No categories found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminViewCategories;
