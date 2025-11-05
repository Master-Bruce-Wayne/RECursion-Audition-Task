import React, { useEffect, useState } from 'react'

const Connect4 = () => {
    const rows=6, cols=7;
    const emptyBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
    // const [board,setBoard] = useState([[]]);
    const [board,setBoard] = useState(emptyBoard);
    const [playerTurn,setPlayerTurn] = useState('R');
    const [scores, setScores] = useState({ R:0, Y:0 });
    const [winner, setWinner] = useState(null);

    // score ko update karne ke liye
    useEffect(() => {
        if(winner) {
            setScores((prev) => ({
            ...prev,
            [winner]: prev[winner] + 1,
      }));
        }
    }, [winner]);

    const checkWinner = (board, playerTurn) => {
        // check column-wise
        for(let c=0; c<cols; c++) {
            for(let r=rows-1; r>=3; r--) {
                if(
                    board[r][c]===playerTurn && board[r-1][c]===playerTurn && 
                    board[r-2][c]===playerTurn &&  board[r-3][c]===playerTurn
                ) {
                    setWinner(playerTurn); 
                    return;
                }
            }
        }

        // check roll wise
        for (let r = rows-1; r>=0; r--) {
            for (let c=0; c<cols-3; c++) {
                if (
                    board[r][c] === playerTurn && board[r][c+1] === playerTurn &&
                    board[r][c+2] === playerTurn && board[r][c+3] === playerTurn
                ) {
                    setWinner(playerTurn);
                    return;
                }
            }
        }

        // check up-right diagonal wise
        for(let r=rows-1; r>=3; r--) {
            for(let c=0; c<cols-3; c++) {
                if (
                    board[r][c] === playerTurn && board[r-1][c+1] === playerTurn &&
                    board[r-2][c+2] === playerTurn && board[r-3][c+3] === playerTurn
                ) {
                    setWinner(playerTurn);
                    return;
                }
            }
        }
        // check up-left diagonal wise
        for(let r=rows-1; r>=3; r--) {
            for(let c=cols-1; c>=3; c--) {
                if (
                    board[r][c] === playerTurn && board[r-1][c-1] === playerTurn &&
                    board[r-2][c-2] === playerTurn && board[r-3][c-3] === playerTurn
                ) {
                    setWinner(playerTurn);
                    return; 
                }
            }
        }

        

    };

    // handles player move
    const handleClick = (col) => {
        if(winner)  return; 

        const newBoard = board.map(r=>[...r]);
        for(let r=rows-1; r>=0; r--) {
            if(newBoard[r][col]==null)  {
                newBoard[r][col]=playerTurn;
                setBoard(newBoard);
                checkWinner(newBoard, playerTurn);
                setPlayerTurn((prev) => {
                    if(prev ==='R')   return 'Y';
                    else return 'R';
                });
                return;
            }
        }
    };

    const resetGame = () => {
        setBoard(emptyBoard);
        setPlayerTurn('R');
        setWinner(null);
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                Connect 4
            </h1>

        <div className="flex justify-between w-full max-w-md mb-4">
            <p className="text-lg font-semibold text-red-500">🔴 Player1: {scores.R}</p>
            <p className="text-lg font-semibold text-yellow-500">🟡 Player2: {scores.Y}</p>
        </div>

        {winner && (
            <div className="mb-4 text-2xl font-semibold text-green-600">
            🏆 Winner: {winner === "R" ? "PLayer1" : "Player2"}
            </div>
        )}

        <div
            className="grid bg-blue-800 p-3 rounded-xl shadow-xl"
            style={{
            gridTemplateColumns: `repeat(${cols}, 70px)`,
            gap: "8px",
            }}
        >
            {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
                <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => handleClick(cIdx)}
                className="w-[70px] h-[70px] rounded-full border-2 border-blue-900 flex items-center justify-center cursor-pointer hover:brightness-110 transition"
                >
                <div
                    className={`w-[60px] h-[60px] rounded-full shadow-inner ${
                    cell === "R"
                        ? "bg-red-500"
                        : cell === "Y"
                        ? "bg-yellow-400"
                        : "bg-gray-200"
                    }`}
                ></div>
                </div>
            ))
            )}
        </div>

        {winner && (
            <button
            onClick={resetGame}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
            Play Again
            </button>
        )}

        {!winner && (
            <p className="mt-4 text-lg font-medium">
            Turn:{" "}
            <span
                className={`${
                playerTurn === "R" ? "text-red-500" : "text-yellow-500"
                }`}
            >
                {playerTurn === "R" ? "Red 🔴" : "Yellow 🟡"}
            </span>
            </p>
        )}
        </div>
  );
};

export default Connect4