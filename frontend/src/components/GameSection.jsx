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
    <div className='flex gap-5 px-5 py-3'>
        {gameData && gameData.map((game) => (
          <GameCard
            key={game._id}
            name={game.name}
            code = {game.code}
            description={game.description}
            thumbnail={game.thumbnail}
            tags={game.tags}
          />
        ))}
    </div>
  )
}

export default GameSection