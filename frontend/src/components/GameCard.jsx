import React from "react";
import { useNavigate } from "react-router-dom";

const GameCard = ({ name,code, description,thumbnail, tags = [] }) => {
  const navigate = useNavigate();
  const basicThumbnail = "https://as1.ftcdn.net/v2/jpg/05/24/96/86/1000_F_524968663_XfevnNL1BmgLovvweNEwgXBRe3SpQodS.jpg";

  const handlePlayNow = () => {
    navigate(`/games/${code}`)
  };

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105 w-64 border border-black cursor-pointer">
      <img
        src={thumbnail || basicThumbnail}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 min-h-15">
            {description || "No description available."}
          </p>
          <div className="flex flex-wrap gap-1 mt-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🎮 Play Now Button */}
        <button
          onClick={handlePlayNow}
          className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;
