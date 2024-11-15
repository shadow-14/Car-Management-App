import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CarListPage from "./pages/CarListPage";
import CarDetailPage from "./pages/CarDetailPage";
import CarCreatePage from "./pages/CarCreatePage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar"; // Import Navbar

function App() {
  const { authUser } = useAuthContext();

  // Define a wrapper component for authenticated routes
  const ProtectedRoute = ({ children }) => {
    return authUser ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar /> {/* Navbar will appear on every page */}
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          {/* Default Route */}
          <Route 
            path="/" 
            element={authUser ? <Navigate to="/Cars" /> : <Navigate to="/login" />} 
          />
          {/* Protected Routes for authenticated users */}
          <Route 
            path="/Cars" 
            element={
              <ProtectedRoute>
                <CarListPage />
              </ProtectedRoute>
            } 
          />
          {/* Login and Signup Routes */}
          <Route 
            path="/login" 
            element={authUser ? <Navigate to="/Cars" /> : <Login />} 
          />
          <Route 
            path="/signup" 
            element={authUser ? <Navigate to="/Cars" /> : <SignUp />} 
          />
          {/* Car Detail and Create Product Routes */}
          <Route 
            path="/cars/:id" 
            element={
              <ProtectedRoute>
                <CarDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/createProduct" 
            element={
              <ProtectedRoute>
                <CarCreatePage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
