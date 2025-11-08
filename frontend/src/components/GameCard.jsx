import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ name,code, description,thumbnail, tags = [] }) => {
  const navigate = useNavigate();
  const basicThumbnail = "https://as1.ftcdn.net/v2/jpg/05/24/96/86/1000_F_524968663_XfevnNL1BmgLovvweNEwgXBRe3SpQodS.jpg";

  const handlePlayNow = () => {
    navigate(`/games/${code}`)
  };

  return (
    <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 w-full max-w-xs border border-white/20 cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={thumbnail || basicThumbnail}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col justify-between min-h-[200px]">
        <div>
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">{name}</h2>
          <p className="text-sm text-purple-100 mt-1 line-clamp-2 min-h-[40px]">
            {description || "No description available."}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-purple-600/30 text-purple-200 rounded-full text-xs border border-purple-400/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🎮 Play Now Button */}
        <button
          onClick={handlePlayNow}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-purple-500/50 transform hover:scale-105"
        >
          Play Now →
        </button>
      </div>
    </div>
  );
};

export default GameCard;
