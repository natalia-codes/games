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
  constructor (props) {
    super(props)
    this.state = {
      current: Array(9).fill(null)
    }
  }

  handleClick = (i) => {

    this.setState({

    })
  }

  renderSquare = (i) => {
    return (
      <Square 
      value={this.state.current[i]}
      onClick={() => {this.handleClick(i)}}/>
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
  render () {
    return (
      <div className='ttt_game'>
        <h1 className='game-title'>TTT Game</h1>
        <Board />
      </div>
    )
  }
}


export default Game