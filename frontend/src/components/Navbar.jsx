import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/UserContext.jsx'
import axios from 'axios'

const Navbar = () => {
  const {userData, setUserData} = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 transform group-hover:rotate-12 transition-transform duration-300">
              <rect width="40" height="40" rx="8" fill="url(#navLogoGrad)"/>
              <path d="M20 12 L23 18 L28 18 L24 23 L25 30 L20 26 L15 30 L16 23 L12 18 L17 18 Z" fill="white"/>
              <defs>
                <linearGradient id="navLogoGrad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#9333EA"/>
                  <stop offset="1" stopColor="#6366F1"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Game-Maniac
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/games"
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 font-medium"
            >
              Games
            </Link>
            <Link
              to="/leaderboard"
              className="px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 font-medium"
            >
              Leaderboard
            </Link>
          </div>

          {/* Right - Auth Section */}
          <div className="flex items-center space-x-3">
            {!userData ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold border border-purple-200 hover:bg-purple-50 transition-all duration-200"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-md">
                  <img
                    src={userData.profilePhoto}
                    alt="profile"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="hidden sm:inline">{userData.username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </div>
                  </Link>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-b-lg"
                  >
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-slideDown">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors mb-2"
            >
              Home
            </Link>
            <Link
              to="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors mb-2"
            >
              Games
            </Link>
            <Link
              to="/leaderboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors mb-2"
            >
              Leaderboard
            </Link>
            {!userData && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar