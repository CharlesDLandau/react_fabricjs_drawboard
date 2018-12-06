import { fabric } from 'fabric';

function onMouseDown(options){

	this.setState({isDown:true},()=>{
		switch(this.state.selectedTool){
			case ("drawTool"):
				this.setState({currObj:false})
				return
			case ('xTool'):
				var p = this.fabricCanvas.getPointer(options.e)
				var ps = [p.x, p.y, p.x, p.y]
				var line = new fabric.Line(ps, {
					strokeWidth: this.state.toolSize,
					fill: this.state.toolColor,
					stroke: this.state.toolColor,
					originX: 'center',
					originY: 'center',
					selectable: false,
					evented:false
				})
				this.setState({currObj:line}, ()=>{this.fabricCanvas.add(this.state.currObj)})
				return
			default:
				return
				}
	})
}

function onMouseMove(options){
	if (this.state.isDown){
		switch(this.state.selectedTool){
			case ("drawTool"):
				return
			case ('xTool'):
				var p = this.fabricCanvas.getPointer(options.e)
				var line = this.state.currObj
				line.set(
					{ x2: p.x, y2: p.y }
				)
				this.setState({currObj:line})
				this.fabricCanvas.renderAll()
				
				return
			default:
				return
				}
	}
}

function onMouseUp(options){
	
	if (!(this.state.currObj)){
		var allObj = this.fabricCanvas.getObjects()
		if (allObj.length > 0){
				var toAdd = allObj[allObj.length-1]
				toAdd.set({
					selectable: false,
					evented:false,
				})}
	}else{
		var toAdd = this.state.currObj;}
	if (!(typeof toAdd == "undefined")){
		this.setState({isDown:false,
			currObj:false,
			redoables: [],
			undoables: [...this.state.undoables, toAdd]})
	}
}


export { onMouseDown, onMouseMove, onMouseUp }