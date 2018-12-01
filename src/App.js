import React, { Component } from 'react';
import './App.css';

import TicTacToe from './components/TicTacToe/TicTacToe.js'


class App extends Component {
  constructor(props){
    super(props);
  }

  
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <TicTacToe />
        </div>

      </div>
    );
  }
}

export default App;
