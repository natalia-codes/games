import React, { Component } from 'react'
import './App.css'




function Square(props) {
    return (
  
      <button className='ttt_parameter' onClick={props.onClick}>
        {props.value}
      </button>
    )
}

class Board extends Component {
  
  renderSquare = (i) => {
    let squareValue
    if(this.props.currentSquares[i] != 'X' && this.props.currentSquares[i] != 'O'){
      squareValue = ''

    } else {
      squareValue = this.props.currentSquares[i]
    }
    return (

      <Square 
      className={'square #' + i}
      value={squareValue}
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
      currentSquares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      humanPlayer: this.props.humanPlayer,
      xsTurn: true
    }
  }

    handleClick = (i) => {
      const newSquares = this.state.currentSquares.slice()

      if (newSquares[i] === 'X' || newSquares[i] === 'O' || checkWinner(newSquares)) {
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
      currentSquares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      humanPlayer: this.state.humanPlayer,
      xsTurn: true
    })
  }
  
  computerMove = () => {
    let result
    if (this.state.humanPlayer === 'X' || this.state.humanPlayer === 'O') {
      const humanPlayer = this.state.humanPlayer
      const computerPlayer = humanPlayer === 'X' ? 'O' : 'X'
      const currentPlayer = this.state.xsTurn ? 'X' : 'O'
      if (humanPlayer === 'X' && currentPlayer === 'O') {
        result = minimax(this.state.currentSquares, 'O', humanPlayer, computerPlayer)
        this.handleClick(result.index)
      } else if (humanPlayer === 'O' && currentPlayer === 'X') {
        result = minimax(this.state.currentSquares, 'X', humanPlayer, computerPlayer)
        this.handleClick(result.index)
      }
    }
  }
  componentDidUpdate() {
    this.computerMove()
  }

  componentDidMount() {
    this.computerMove()
  }

  render () {

    const squares = this.state.currentSquares
    // let newGameButton
    let status 

    if (checkWinner(squares)) {
      status = checkWinner(squares) + ' Wins!'
     
    } else if (!checkWinner(squares) && emptySpaces(squares).length === 0) {
      status = 'Tie'
     
    } else {
      status = this.state.xsTurn ? 'Current Player: X' : 'Current Player: O'
    }

    return (
      <div className='ttt_game'>

        <h2 className='game-status'>{status}</h2>
        <Board 
          onClick={this.handleClick} 
          currentSquares={squares}
        />

        <div className='button-container'>
        <button 
            className='menu-button' 
            onClick={this.props.returnFunction}
          >Menu</button>
          <button 
            className='new-game' 
            onClick={this.restart}
          >Restart Game</button>
       </div>
      </div>
    )
  }
}

class StartMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameStarted: false,
      numberOfPlayers: null,
      chooseSide: false,
      humanPlayer: null
    }
  }


  startTwoPlayerGame = () => {
    this.setState({
      gameStarted: true,
      numberOfPlayers: 2
    })
  }
  chooseSideMenu = () => {
    this.setState({
      chooseSide: true,
    })
  }
  chooseSideX = () => {
    this.setState({
      gameStarted: true,
      numberOfPlayers: 1,
      chooseSide: false, 
      humanPlayer: 'X'
    })
  }
  chooseSideO = () => {
    this.setState({
      gameStarted: true, 
      numberOfPlayers: 1, 
      chooseSide: false, 
      humanPlayer: 'O'
    })
  }
  returnToMenu = () => {
    this.setState({
      gameStarted: false,
      numberOfPlayers:null,
      chooseSide: false, 
      humanPlayer: null

    })
  }

  render () {
    return (
    <div> 
      <h1 className='game-title'>TTT Game</h1>
      {!this.state.gameStarted && !this.state.chooseSide &&
        <OptionButtons 
          title='One Player Or Two?' 
          optionOne='One'
          handleClickOne={this.chooseSideMenu}
          optionTwo='two'
          handleClickTwo={this.startTwoPlayerGame}
        />
      }
        {this.state.chooseSide && !this.state.gameStarted && 
        <OptionButtons
          title='X or O?' 
          optionOne='X'
          handleClickOne={this.chooseSideX}
          optionTwo='O'
          handleClickTwo={this.chooseSideO}
        />
      }
      {this.state.gameStarted &&
        <div>
          <Game 
            numberOfPlayers={this.state.numberOfPlayers} 
            humanPlayer={this.state.humanPlayer}
            returnFunction={this.returnToMenu}
          />
        </div>
      }
    </div>
  )
  }
}
class OptionButtons extends Component {
  render () {
    return (
      <div>
        <p>{this.props.title}</p>
        <button 
          className='button' 
          onClick={this.props.handleClickOne}
        >{this.props.optionOne}</button>
        <button 
          className='button' 
          onClick={this.props.handleClickTwo}
        >
          {this.props.optionTwo}
        </button>
      </div>
    )
  }
}

class App extends Component {
  render () {
    return (
      <div>

        <StartMenu />
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


function emptySpaces (board) {
  const result = []

  for (let i = 0; i < board.length; i++) {
    if (board[i] !== 'X' && board[i] !== 'O'){
      result.push(i)
    }
  }
  return result
}

function minimax (board, current, human, computer) {
  const newBoard = board.slice()
  const availableSpaces = emptySpaces(newBoard)
  const moves = []


  if (checkWinner(newBoard) === human) {
    return { score: -10 };
  } else if (checkWinner(newBoard) === computer) {
    return { score: 10 };
  } else if (availableSpaces.length === 0){
    return { score: 0 };
  }

  for (let i = 0; i < availableSpaces.length; i++) {
    const move = {}
    move.index = newBoard[availableSpaces[i]]

    newBoard[availableSpaces[i]] = current

    if (current === computer) {
      const result = minimax(newBoard, human, human, computer)
      move.score = result.score
    } else {
      const result = minimax(newBoard, computer, human, computer)
      move.score = result.score
    }

    newBoard[availableSpaces[i]] = move.index

    moves.push(move)
  }

  let bestMove

  if (current === computer) {

    let bestScore = -10000

    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    let bestScore = 10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}

export default App
