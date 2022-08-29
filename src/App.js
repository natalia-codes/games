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
    // constructor (props) {
  //   super(props)
  //   this.state = {
  //     current: Array(9).fill(null),
  //     xsTurn: true
  //   }
  // }

  renderSquare = (i) => {
    return (
      <Square 
      value={this.props.currentGame[i]}
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
      currentGame: Array(9).fill(null),
      xsTurn: true
    }
  }

    handleClick = (i) => {
    if (this.state.currentGame[i] !== null) {
      return
    }
    const newSquares = this.state.currentGame.slice()
    newSquares[i] = this.state.xsTurn ? 'X' : 'O'
    this.setState({
      currentGame: newSquares,
      xsTurn: !this.state.xsTurn
    })
  }
  render () {
    return (
      <div className='ttt_game'>
        <h1 className='game-title'>TTT Game</h1>
        <Board onClick={this.handleClick} currentGame={this.state.currentGame}/>
      </div>
    )
  }
}


export default Game