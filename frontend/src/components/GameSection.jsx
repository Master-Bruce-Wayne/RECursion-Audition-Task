import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GameContext } from '../context/GameContext.jsx'
import GameCard from './GameCard.jsx'

const GameSection = () => {
  const {gameData, setGameData, loading, fetchGames} = useContext(GameContext);
  // console.log("GameHelper", gameHelper);

  useEffect(() => {
    // console.log("fetchData called");
    fetchGames();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5 py-3 justify-items-center'>
        {gameData && gameData.length > 0 ? (
          gameData.map((game) => (
            <GameCard
              key={game._id}
              name={game.name}
              code = {game.code}
              description={game.description}
              thumbnail={game.thumbnail}
              tags={game.tags}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-purple-300 text-xl">Loading games...</div>
          </div>
        )}
    </div>
  )
}

export default GameSection