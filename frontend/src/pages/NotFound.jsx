import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 SVG Animation */}
        <div className="mb-8">
          <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <text x="150" y="100" fontSize="120" fontWeight="bold" fill="url(#404Grad)" textAnchor="middle" className="font-extrabold">
              404
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
            </text>
            <defs>
              <linearGradient id="404Grad" x1="0" y1="0" x2="300" y2="200">
                <stop stopColor="#FBBF24" offset="0%"/>
                <stop stopColor="#F59E0B" offset="50%"/>
                <stop stopColor="#EF4444" offset="100%"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Decorative SVG */}
        <div className="mb-8 flex justify-center">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10,5">
              <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite"/>
            </circle>
            <path d="M100 50 L120 90 L160 90 L130 120 L140 160 L100 140 L60 160 L70 120 L40 90 L80 90 Z" fill="white" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="10s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Fun Message */}
        <p className="mt-8 text-purple-300 text-sm">
          Maybe the game you're looking for is in another dimension? 🎮
        </p>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default NotFound
