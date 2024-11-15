import { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite

const CarListPage = () => {
  const navigate = useNavigate(); 
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleClick = () => {
    navigate('/createProduct'); // Ensure the route exists in your routes
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('authUser'));
        const token = storedUser; // assuming authUser contains a token field
  
        if (!token) {
          console.error("No token found");
          return;
        }
  
        const response = await axios({
          method: 'GET',
          url: `${apiUrl}/api/cars/`,
          headers: { Authorization: `Bearer ${token}` }
        });
        // console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter cars based on the search query
  const filteredCars = cars.filter((car) => {
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className='container mx-auto p-4'>
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredCars.map((car) => (
          <CarCard 
            key={car._id} 
            title={car.title} 
            description={car.description} 
            id={car._id} 
            images={car.images} // Passing the first image only
          />
        ))}
      </div>

      <button onClick={handleClick} className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded shadow hover:bg-red-700 mt-4">
        Create Product
      </button>
    </div>
  );
};

export default CarListPage;
