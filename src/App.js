import React, { Component } from 'react'
import './App.css'
// import '.AI'
// import computerMove from './AI'



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

    const numberOfPlayers = this.props.numberOfPlayers
    const squares = this.state.currentSquares

    if (numberOfPlayers === 1 && !this.state.xsTurn && squares.includes(null)) {

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
    // let newGameButton
    let status 

    if (checkWinner(squares)) {
      status = checkWinner(squares) + ' Wins!'
     
    } else if (!checkWinner(squares) && !squares.includes(null)) {
      status = 'Tie'
     
    } else {
      status = this.state.xsTurn ? 'Current Player: X' : 'Current Player: O'
    }

    return (
      <div className='ttt_game'>
        <h1 className='game-title'>TTT Game</h1>
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
      numberOfPlayers:null
    })
  }

  render () {
    return (
    <div> 
      {!this.state.gameStarted && !this.state.chooseSide &&
        <Options 
          title='One Player Or Two?' 
          optionOne='One'
          handleClickOne={this.chooseSideMenu}
          optionTwo='two'
          handleClickTwo={this.startTwoPlayerGame}
        />
      }
      {
        this.state.chooseSide && !this.state.gameStarted && 
        <Options 
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
class Options extends Component {
  render () {
    return (
      <div>
        <p>{this.props.title}</p>
        <button 
          className='button' 
          onClick={this.props.handleClickOne}
        >
          {this.props.optionOne}
        </button>
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
      <StartMenu />
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

export default App
