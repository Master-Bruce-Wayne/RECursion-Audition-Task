import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {userData, setUserData} = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.post(`${apiUrl}/user/login`, data, {
        withCredentials: true,   // cookies ke liye
      });

      // console.log("User Response fetched: ", response);
      

      if (response.data.success === false) {
        alert(response.data.message || "Login failed!");
        navigate("/login");
        return;
      }
      console.log("User login details fetched");

      // Extract user info from response
      const userInfo = {
        _id: response.data._id,
        username: response.data.username,
        fullName: response.data.fullName,
        email: response.data.email,
        profilePhoto: response.data.profilePhoto,
        score: response.data.score,
      };

      // set user in userContxt
      setUserData(userInfo);
      localStorage.setItem("userData", JSON.stringify(userInfo));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      alert("Error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-blue-500 to-indigo-600">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
