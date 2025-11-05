import React, { useEffect, useState } from 'react'

const Connect4 = () => {
    const rows=6, cols=7;
    const emptyBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));
    // const [board,setBoard] = useState([[]]);
    const [board,setBoard] = useState(emptyBoard);
    const [playerTurn,setPlayerTurn] = useState('R');
    const [scores, setScores] = useState({ R:0, Y:0 });
    const [winner, setWinner] = useState(null);

    const checkWinner = (board, playerTurn) => {
        // check column-wise
        for(let c=0; c<cols; c++) {
            for(let r=rows-1; r>=3; r--) {
                if(
                    board[r][c]===playerTurn && board[r-1][c]===playerTurn && 
                    board[r-2][c]===playerTurn &&  board[r-3][c]===playerTurn
                ) {
                    setWinner(playerTurn); return;
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

        // check up- diagonal wise
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

  return (
    <div>
        <p>connect4</p>
    </div>
  )
}

export default Connect4