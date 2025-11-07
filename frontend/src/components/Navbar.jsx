import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/UserContext.jsx'
import axios from 'axios'

const Navbar = () => {
  const {userData,setUserData} = useAuth();
  const navigate = useNavigate();

  const onLogout = async() => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiUrl}/user/logout`, { withCredentials: true });

      if(response.data.success===false) {
        alert(response.data.message || "Logout failed!");
        navigate("/");
        return;
      }

      setUserData(null);
      localStorage.removeItem("userData");
      navigate("/login");
    } catch(err) {
      console.error("Logout error:", err);
      alert("Error while logging out.");
    }
  }

  return (
    <nav className="bg-white px-6 py-3 shadow-md flex justify-between items-center font-helvetica">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Game-Maniac
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link
          to="/"
          className="text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition"
        >
          Home
        </Link>
        <Link
          to="/games"
          className="text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition"
        >
          Games
        </Link>
        <Link
          to="/leaderboard"
          className="text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition"
        >
          Leaderboard
        </Link>
      </div>

      {/* Right - Auth Section */}
      <div className="flex items-center space-x-4">
        {!userData ? (
          <>
            <Link
              to="/login"
              className="bg-white text-purple-900 px-4 py-2 rounded-md font-semibold border border-purple-900 hover:bg-gray-200 transition"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="border border-white bg-purple-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-purple-700 px-3 py-1 text-white rounded-md hover:bg-purple-600">
              <img
                src={userData.profilePhoto}
                alt="profile"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span>{userData.username}</span>
              <span>▼</span>
            </button>
            <div className="absolute right-0 bg-white text-black mt-2 rounded-md shadow-lg hidden group-hover:block">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar