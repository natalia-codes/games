import React, { Component } from 'react'
import './App.css'
// import '.AI'
import computerMove from './AI'



function Square(props) {
    return (
  
      <button className='ttt_parameter' onClick={props.onClick}>
        {props.value}
      </button>
    )
}

class Board extends Component {
  
  renderSquare = (i) => {
    return (
      <Square 
      className={'square #' + i}
      value={this.props.currentSquares[i]}
      onClick={() => {this.props.onClick(i)}}/>
    )
  }
  render () {
    return (
      <div className='game-board'>
        <div className='game-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='game-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='game-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSquares: Array(9).fill(null),
      xsTurn: true
    }
  }

    handleClick = (i) => {
      const newSquares = this.state.currentSquares.slice()

      if (newSquares[i] !== null || checkWinner(newSquares)) {
      return
    }

    newSquares[i] = this.state.xsTurn ? 'X' : 'O'
    this.setState({
      currentSquares: newSquares,
      xsTurn: !this.state.xsTurn
    })
  }

  
  restart = () => {
    this.setState({
      currentSquares: Array(9).fill(null),
      xsTurn: true
    })
  }
  
  componentDidUpdate() {
    const isOnePlayer = this.props.isOnePlayer
    const squares = this.state.currentSquares

    if (isOnePlayer === 'true' && !this.state.xsTurn && squares.includes(null)) {
      let movePossible = false

      while (!movePossible) {
        let num = random()

        if (squares[num] === null) {
          this.handleClick(num)
          movePossible = true
        }
      }
      // console.log(computerMove(squares))
      // this.handleClick(computerMove(squares))
    }
  }

  render () {

    const squares = this.state.currentSquares

    let newGameButton

    let status 

    // if oneplayer && !this.state.xsturn {
      // const event - new mouse event click

    // }

    if (checkWinner(squares)) {
      status = checkWinner(squares) + ' Wins!'
      newGameButton = <button className='new-game' onClick={this.restart}>New Game?</button>
    } else if (!checkWinner(squares) && !squares.includes(null)) {
      status = 'Tie'
      newGameButton = <button className='new-game' onClick={this.restart}>New Game?</button>
    } else {
      status = this.state.xsTurn ? 'Current Player: X' : 'Current Player: O'
    }

    return (
      <div className='ttt_game'>
        <h1 className='game-title'>TTT Game</h1>
        <h2 className='game-status'>{status}</h2>
        <Board onClick={this.handleClick} currentSquares={squares}/>

        {newGameButton}
      </div>
    )
  }
}

  function checkWinner (check)  {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  
    for (let i = 0, length = lines.length; i < length; i++) {
      const [a, b, c] = lines[i]
      if (check[a] && check[a] === check[b] && check[a] === check[c]) {
        return check[a]
      }
    }
    return null
  }

  function random () {
    return Math.floor(Math.random() * (8 - 0 + 1)) + 0
  }



export default Game