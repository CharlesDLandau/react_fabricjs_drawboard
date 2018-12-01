// react, fabric and styles
import React, { Component } from 'react';
import '../../App.css';
import { fabric } from 'fabric';

// Children and assets
import Board from '../Board/Board.js';
import Button from '../Button/Button.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight,
  faTimes, faPencilRuler, faDotCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

// Utils
import drawGrid from './utils/drawGrid.js';
import { undo, redo } from './utils/doStack.js';
import { onMouseDown, onMouseMove, onMouseUp } from './utils/eventHandlers.js'


class TicTacToe extends Component {
  constructor(props){
    super(props);
    this.state = { 
      width: 0,
      height: 0,
      undoables: [],
      redoables:[],
      drawTool: false,
      xTool: false,
      otool: false,
    };

    this.canvasRef = React.createRef();

    // Bind utils to this
    this.drawGrid = drawGrid.bind(this);
    this.onMouseDown = onMouseDown.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.onMouseUp = onMouseUp.bind(this);
    this.undo = undo.bind(this);
    this.redo = redo.bind(this);


  }

  componentDidMount(){
    // Grouping the static objects for extensibility
    this.grid = new fabric.Group()

    // Detect important props in lieu of deconstruction
    if (this.props.hasOwnProperty("canvasID")){
      var canvasID = this.props.canvasID
    }else{ //default HTML id prop for canvas tag
      var canvasID = "tictactoe-fabric-canvas-default-id"
    }
    if (this.props.hasOwnProperty("canvasOpts")){
      var canvasOpts = this.props.canvasOpts
    }else{ //default opts
      var canvasOpts = {
        backgroundColor: '#ECDFA5',
        height: this.state.height,
        width: this.state.width,
        selection:false,
        undone:[]
      }
    }

    this.setState({canvasID:canvasID}, ()=>{ // In case we want state to know ID
      this.fabricCanvas = new fabric.Canvas(canvasID, canvasOpts)
      // After some experimentation this is a nice place to assign the brush
      this.fabricCanvas.freeDrawingBrush = new fabric['PencilBrush'](this.fabricCanvas);
      this.fabricCanvas.freeDrawingBrush.color = 'black';
      this.fabricCanvas.freeDrawingBrush.width = 5;

    })

    // Not a substitute for a real responsive canvas solution as
    // big -> small window transition still breaks this
    var w = window.innerWidth;
    var h = window.innerHeight;
    var m = Math.min(w, h)
    this.setState({ width: w, height: h }, ()=>{
      if (!(typeof this.fabricCanvas == "undefined")){
        // Dims
        this.fabricCanvas.setWidth(m/2)
        this.fabricCanvas.setHeight(m/2)}

        // See './utils/drawGrid.js'
        this.drawGrid()

        // See './utils/eventHandlers.js'
        this.fabricCanvas.on("mouse:down", this.onMouseDown)
        this.fabricCanvas.on("mouse:move", this.onMouseMove)
        this.fabricCanvas.on("mouse:up", this.onMouseUp)


        this.fabricCanvas.on("path:created", this.onMouseDown)
          
    });


  }

  toolBaldly = name => event => {
    this.setState({
      isDown:false,
      drawTool: false,
      xTool: false,
      oTool: false,
    }, ()=>{
      this.setState({
          [name]:!this.state[name],
          selectedTool: name
        }, ()=>{
          console.log(this.state)
          this.fabricCanvas.isDrawingMode = this.state.drawTool
          })
    })
  }

  componentWillUnmount() {
  }

  renderMain() {
    const toolBaldly = this.toolBaldly
    return (

          <span>
          <Button className="App-button">
            <FontAwesomeIcon icon={faArrowCircleLeft} onClick={this.undo}/>
          </Button>
          
          <Button className="App-button">
            <FontAwesomeIcon icon={faArrowCircleRight} onClick={this.redo}/>
          </Button>
          
          <div>
          <Button title="Free draw"
            className="App-button"
            onClick={toolBaldly("drawTool")} 
            style={
              {backgroundColor: this.state.drawTool ? "grey" : "rgba(0,0,0,0)"}
            }>
            <FontAwesomeIcon icon={faEdit}/>
          </Button>
          
          <Button
            title="Draw line"
            className="App-button"
            onClick={toolBaldly("xTool")}
            style={
              {backgroundColor: this.state.xTool ? "grey" : "rgba(0,0,0,0)"}
            }>
            <FontAwesomeIcon icon={faPencilRuler}/>
          </Button>

          <Button
            title="Draw circle"
            className="App-button"
            onClick={toolBaldly("oTool")}
            style={{backgroundColor: this.state.oTool ? "grey" : "rgba(0,0,0,0)"}
            }>
            <FontAwesomeIcon icon={faDotCircle}/>
          </Button>
          </div>

          </span>
          )
  }

  render() {
    const renderMain = this.renderMain()
    return (
      <div><Board canvasRef={this.canvasRef} canvasId={this.state.canvasID} />
          <br/>{renderMain}</div>
      )
  }
}

export default TicTacToe;
