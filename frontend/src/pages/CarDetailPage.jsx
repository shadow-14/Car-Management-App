import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '', images: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('authUser'));
        const response = await axios({
            method: 'GET',
            url: `http://localhost:3000/api/cars/${id}`,
            headers: { authorization: `Bearer ${token}` }
        });
        setCar(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          tags: response.data.tags.join(', '),
          images: response.data.images.join(', '),
        });
        
      } catch (error) {
        console.error("Failed to fetch car:", error);
      }
    };
    fetchCar();
  }, [id]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authUser'));
      await axios.put(`http://localhost:3000/api/cars/${car._id}`, formData, {
        headers: { authorization: `Bearer ${token}` },
      });
      setCar({ ...car, ...formData });
      setIsEditing(false);
      alert('Car updated successfully');
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('authUser'));
      await axios.delete(`http://localhost:3000/api/cars/${car._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      alert('Car deleted successfully');
      navigate('/Cars');
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (!car) return <p className="text-center text-gray-600">Loading car details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">{isEditing ? 'Edit Car' : car.title}</h2>

      {isEditing ? (
        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Images (comma-separated URLs)"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded shadow hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p><span className="font-semibold">Description:</span> {car.description}</p>
          <p><span className="font-semibold">Tags:</span> {car.tags}</p>
          <div>
            <span className="font-semibold">Images:</span>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {car.images.map((image, index) => (
                
                <img
                  key={index}
                  src={`${apiUrl}/${image.replace(/\\/g, '/')}`}  // Assuming your server is serving the static files from /uploads
                  // {console.log(src)}s
                  alt={`Car Image ${index + 1}`}
                  className="w-full h-auto rounded"
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded shadow hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
