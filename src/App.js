import React, { Component } from 'react';
import './App.css';

import DrawBoard from './components/DrawBoard/DrawBoard.js'


class App extends Component {  
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <DrawBoard />
        </div>

      </div>
    );
  }
}

export default App;
