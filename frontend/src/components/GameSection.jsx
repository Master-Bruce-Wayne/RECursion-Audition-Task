import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GameContext } from '../context/GameContext'

const GameSection = () => {
  const {gameData, setGameData, loading, fetchGames} = useContext(GameContext);
  // console.log("GameHelper", gameHelper);

  useEffect(() => {
    // console.log("fetchData called");
    fetchGames();
  }, []);

  return (
    <div>
        {gameData && gameData.map((game) => (
          <div key={game.code}>
            <li className=''>{game.name}</li>
          </div>
        ))}
    </div>
  )
}

export default GameSection