// react, fabric and styles
import React, { Component } from 'react';
import { fabric } from 'fabric';

// Children and assets
import Board from '../Board/Board.js';
import RadioGroup from '../RadioGroup/RadioGroup.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight,
  faPencilRuler, faCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

// Utils
import { undo, redo } from './utils/doStack.js';
import { onMouseDown, onMouseMove, onMouseUp } from './utils/eventHandlers.js'

import { faPen, faPencilAlt, faPenFancy } from '@fortawesome/free-solid-svg-icons';


class DrawBoard extends Component {
  constructor(props){
    super(props);
    this.state = { 
      width: 0,
      height: 0,
      undoables: [],
      redoables:[],
      drawTool: false,
      toolSize: "2",
      toolColor: "black",
      xTool: false,
    };

    this.canvasRef = React.createRef();

    // Bind utils to this
    this.onMouseDown = onMouseDown.bind(this);
    this.onMouseMove = onMouseMove.bind(this);
    this.onMouseUp = onMouseUp.bind(this);
    this.undo = undo.bind(this);
    this.redo = redo.bind(this);
    this.handleBaldly = this.handleBaldly.bind(this)


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
      this.fabricCanvas.freeDrawingBrush.color = this.state.toolColor;
      this.fabricCanvas.freeDrawingBrush.width = this.state.toolSize;

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

        // See './utils/eventHandlers.js'
        this.fabricCanvas.on("mouse:down", this.onMouseDown)
        this.fabricCanvas.on("mouse:move", this.onMouseMove)
        this.fabricCanvas.on("mouse:up", this.onMouseUp)


        this.fabricCanvas.on("path:created", this.onMouseDown)
          
    });



  }

  handleBaldly = name => (event) => {
    this.setState({ [name]: event.target.value }, ()=>{
      switch(name){
        case 'toolSize':
          this.fabricCanvas.freeDrawingBrush.width = this.state.toolSize
          return
        case 'toolColor':
          this.fabricCanvas.freeDrawingBrush.color = this.state.toolColor
          return
        default:
          return
      }
    });

  }; 

  toolBaldly = name => event => {
    this.setState({
      isDown:false,
      drawTool: false,
      xTool: false,
    }, ()=>{
      this.setState({
          [name]:!this.state[name],
          selectedTool: name
        }, ()=>{
          this.fabricCanvas.isDrawingMode = this.state.drawTool
          })
    })
  }

  componentWillUnmount() {
  }

  renderMain() {
    const toolBaldly = this.toolBaldly
    const handleToolsize = this.handleBaldly("toolSize")
    const handleToolcolor = this.handleBaldly("toolColor")
    return (

          <span>
          <RadioGroup value={0} radiosConfig={[0, 1]} onSubmit={()=>{return null}} labels={[
            <FontAwesomeIcon icon={faArrowCircleLeft} title="undo"
            onClick={this.undo}/>,
            <FontAwesomeIcon icon={faArrowCircleRight} title="redo"
            onClick={this.redo}/>
                  ]}/>
          
          <br/><div>
          <RadioGroup value={0} radiosConfig={[
            {value:0}, {value:1}
            ]} onSubmit={()=>{return null}} labels={[
            <FontAwesomeIcon color="lightGrey"
              onClick={toolBaldly("drawTool")} 
              title="Free draw" icon={faEdit}/>,
            <FontAwesomeIcon color="lightGrey" 
            icon={faPencilRuler} title="Draw line"
            onClick={toolBaldly("xTool")}
            />
                  ]}/>

          

          </div>
          <div><span><br/>
          <RadioGroup value={this.state.toolSize} onSubmit={handleToolsize}
          radiosConfig={
              [
                {value: "2"},
                {value: "4"},
                {value: "6"},
              ]
          } labels={
              [
                <FontAwesomeIcon icon={faPenFancy} onClick={handleToolsize}
                color="lightGrey" title="Thin lines"
                />,
                <FontAwesomeIcon icon={faPencilAlt} onClick={handleToolsize}
                color="lightGrey" title="Medium thickness lines"
                />,
                <FontAwesomeIcon icon={faPen} onClick={handleToolsize}
                color="lightGrey" title="Thick lines"
                />
              ]
          } />
          <br/>
          <RadioGroup value={this.state.toolColor} onSubmit={handleToolcolor}
          radiosConfig={
              [
                {value: "black"},
                {value: "blue"},
                {value: "red"},
                {value: "green"}
              ]
          } labels={
              [
                <FontAwesomeIcon icon={faCircle} color="black" title="black" style={
                    {borderRadius:"4px", padding:"1px"}
                  }/>,
                <FontAwesomeIcon icon={faCircle} color="blue" title="blue" style={
                    {borderRadius:"4px", padding:"1px"}
                  }/>,
                <FontAwesomeIcon icon={faCircle} color="red" title="red" style={
                    {borderRadius:"4px", padding:"1px"}
                  }/>,
                <FontAwesomeIcon icon={faCircle} color="green" title="green" style={
                    {borderRadius:"4px", padding:"1px"}
                  }/>
              ]
          } />
          </span>
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

export default DrawBoard;