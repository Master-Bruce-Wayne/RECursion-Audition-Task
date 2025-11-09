import React, { useEffect, useState } from 'react'

const Connect4 = () => {
    const rows=6, cols=7;
    const emptyBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
    const [board,setBoard] = useState(emptyBoard);
    const [playerTurn,setPlayerTurn] = useState('R');
    const [scores, setScores] = useState({ R:0, Y:0 });
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);

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
                    setWinningCells([[r,c], [r-1,c], [r-2,c], [r-3,c]]);
                    return;
                }
            }
        }

        // check row wise
        for (let r = rows-1; r>=0; r--) {
            for (let c=0; c<cols-3; c++) {
                if (
                    board[r][c] === playerTurn && board[r][c+1] === playerTurn &&
                    board[r][c+2] === playerTurn && board[r][c+3] === playerTurn
                ) {
                    setWinner(playerTurn);
                    setWinningCells([[r,c], [r,c+1], [r,c+2], [r,c+3]]);
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
                    setWinningCells([[r,c], [r-1,c+1], [r-2,c+2], [r-3,c+3]]);
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
                    setWinningCells([[r,c], [r-1,c-1], [r-2,c-2], [r-3,c-3]]);
                    return; 
                }
            }
        }
    };

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
        setWinningCells([]);
    }

    const isWinningCell = (r, c) => {
        return winningCells.some(([wr, wc]) => wr === r && wc === c);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                            Connect 4
                        </span>
                    </h1>
                    <p className="text-blue-200 text-sm md:text-base">Get four in a row to win!</p>
                </div>

                {/* Score Board */}
                <div className="flex justify-center gap-6 md:gap-12 mb-6">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 min-w-[120px] text-center transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 shadow-lg mr-2"></div>
                            <p className="text-lg font-bold text-white">Player 1</p>
                        </div>
                        <p className="text-3xl font-extrabold text-red-300">{scores.R}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20 min-w-[120px] text-center transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-center mb-2">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg mr-2"></div>
                            <p className="text-lg font-bold text-white">Player 2</p>
                        </div>
                        <p className="text-3xl font-extrabold text-yellow-300">{scores.Y}</p>
                    </div>
                </div>

                {/* Winner Announcement */}
                {winner && (
                    <div className="mb-6 text-center animate-bounce">
                        <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-2xl font-bold">
                                    Winner: {winner === "R" ? "Player 1 🔴" : "Player 2 🟡"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Board */}
                <div className="flex justify-center mb-6">
                    <div
                        className="grid bg-gradient-to-b from-blue-800 to-blue-900 p-4 md:p-6 rounded-3xl shadow-2xl border-4 border-blue-700"
                        style={{
                        gridTemplateColumns: `repeat(${cols}, minmax(50px, 70px))`,
                        gap: "8px",
                        }}
                    >
                        {board.map((row, rIdx) =>
                        row.map((cell, cIdx) => {
                            const isWinner = isWinningCell(rIdx, cIdx);
                            return (
                                <div
                                key={`${rIdx}-${cIdx}`}
                                onClick={() => handleClick(cIdx)}
                                className={`w-full aspect-square rounded-full border-2 border-blue-900 flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-200 ${
                                    !cell && !winner ? 'hover:scale-110' : ''
                                } ${isWinner ? 'ring-4 ring-yellow-400 ring-offset-2 animate-pulse' : ''}`}
                                >
                                <div
                                    className={`w-[85%] h-[85%] rounded-full shadow-inner transition-all duration-300 ${
                                    cell === "R"
                                        ? "bg-gradient-to-br from-red-500 to-red-700"
                                        : cell === "Y"
                                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600"
                                        : "bg-gray-200"
                                    } ${isWinner ? 'animate-pulse scale-110' : ''}`}
                                ></div>
                                </div>
                            );
                        })
                        )}
                    </div>
                </div>

                {/* Turn Indicator / Reset Button */}
                {winner ? (
                    <div className="text-center">
                        <button
                            onClick={resetGame}
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                        >
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                            <p className="text-lg font-medium text-white">
                                Turn:{" "}
                                <span
                                    className={`font-bold text-xl ${
                                    playerTurn === "R" ? "text-red-400" : "text-yellow-400"
                                    }`}
                                >
                                    {playerTurn === "R" ? "🔴 Red" : "🟡 Yellow"}
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
  );
};

export default Connect4