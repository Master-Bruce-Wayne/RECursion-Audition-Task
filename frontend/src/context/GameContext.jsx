import { createContext, useContext, useState } from "react";
import axios from 'axios';

export const GameContext = createContext(null);

export const GameProvider = (props) => {
    const [gameData, setGameData] = useState([]);
    // const [gameData, setGameData] = useState([{}]);
    // adds an extra empty object to the gameData [] -> wrong
    const [loading, setLoading] = useState(false);

    const fetchGames = async() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        setLoading(true);
        try{
            const response = await axios.get(`${apiUrl}/game`)
            // console.log("Response.data fetched:", response.data);
            setGameData(response.data);
            // console.log("GameData: ",gameData);
        } catch(err) {
            console.log(err);
            alert(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <GameContext.Provider value={{gameData, setGameData, loading, fetchGames }} >
            {props.children}
        </GameContext.Provider>
    )
}

export const useGame = () => {
    const game = useContext(GameContext);
    return game;
}