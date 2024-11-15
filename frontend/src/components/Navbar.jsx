import { Link } from "react-router-dom";
import { useAuthContext } from "./../context/AuthContext";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { authUser} = useAuthContext();  // Assuming `logout` is a function to handle logouts
  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('authUser');
    navigate('/Login');
    window.location.reload();
  }
  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-semibold">
          Car Management
        </Link>

        <div>
          {authUser ? (
            <>
              {/* If the user is logged in */}
              <Link to="/Cars" className="text-white px-4 py-2">
                View Cars
              </Link>
              <Link to="/createProduct" className="text-white px-4 py-2">
                Create Product
              </Link>
              <button 
                onClick={logout} 
                className="text-white px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* If the user is not logged in */}
              <Link to="/login" className="text-white px-4 py-2">
                Login
              </Link>
              <Link to="/signup" className="text-white px-4 py-2">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
