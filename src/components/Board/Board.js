import React, { Component } from 'react';
import Field from '../Field/Field.js'



class Board extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}

	renderCanvas(){
      return <canvas ref={this.props.canvasId}
      id={this.props.canvasId}/>
	}

	render() {
		const renderCanvas = this.renderCanvas()
	    return (
	      <div>
	      {renderCanvas}
	      </div>
	    );
  }
}

export default Board;
