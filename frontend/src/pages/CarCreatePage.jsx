import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Optional: for notifications
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite

const ProductCreatePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); // To store tags as a string
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => { 
    const files = Array.from(e.target.files);
     if (files.length > 0) { setImage(files); }
    }

  const handleTagChange = (e) => {
    setTags(e.target.value); // Update tags input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled in
    if (!title || !description || !tags ) {
      toast.error("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags); // Pass tags as a string
    if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append('images', image[i]);  // 'images' matches the field name in multer
        }
      }
   
    setLoading(true);

    try {
      let token = JSON.parse(localStorage.getItem("authUser"));
     
      // Send the formData as the body of the request
      const response = await axios.post(`${apiUrl}/api/cars/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to specify this when sending FormData
          authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      setLoading(false);
      toast.success("Product created successfully!");

      // Reset form fields after successful submission
      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter product description"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={handleTagChange}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tags (e.g. car, sedan, electric)"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            multiple={true}
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductCreatePage;
