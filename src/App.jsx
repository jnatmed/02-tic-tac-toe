import { useState } from 'react'
import './index.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constant'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { TableroModal } from './components/TableroModal'

const board = Array(9).fill(null)

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    
    // no actualizamos esta posicion
    // si ya tiene algo
    if (board[index] || winner ) return 
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner) // la actualizacion del estado es asincrona
    }else if(checkEndGame(newBoard)){
      setWinner(false) // a habido un empate
    } 
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        <TableroModal board={board} updateBoard={updateBoard}/>
        
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
        </Square>
      </section>  

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
    )
}

export default App
