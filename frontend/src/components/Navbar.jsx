import React from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'

const Navbar = ({user,onLogout}) => {
  return (
    <nav className="bg-white px-6 py-3 shadow-md flex justify-between items-center font-helvetica">
      {/* Left - Brand / Logo */}
      <div
        className="text-2xl  cursor-pointer"
        onClick={() => navigate("/")}
      >
        Logo
      </div>

      {/* manage routes  */}
      {/* Center - Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition">Home</Link>
        <Link to="/games" className="text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition">Games</Link>
        <Link to="/leaderboard" className=" text-gray-700 px-2 py-2 rounded-md hover:text-purple-600 hover:bg-gray-200 transition">Leaderboard</Link>
      </div>

      {/* Right - Auth Section */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className="bg-white text-purple-900 px-4 py-2 rounded-md font-semibold border border-b-purple-900 hover:bg-gray-200 transition"
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
            <button className="flex items-center space-x-2 bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500">
              <span>{user.name}</span>
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
  )
}

export default Navbar