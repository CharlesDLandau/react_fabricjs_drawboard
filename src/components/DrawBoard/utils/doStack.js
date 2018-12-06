function undo(){
	var undoables = this.state.undoables
	

	if (undoables.length > 0){
		var allObjects = this.fabricCanvas.getObjects()
		var searchItem = undoables.pop()
		var toUndo = allObjects.indexOf(searchItem)
		
		this.setState({undoables: undoables,
					   redoables: [...this.state.redoables, this.fabricCanvas.getObjects()[toUndo]]}, ()=>{
					   	this.fabricCanvas.remove(this.fabricCanvas.getObjects()[toUndo])
					   }
				)}
}

function redo(){
	var redoables = this.state.redoables
	if (redoables.length > 0){
		var toRedo = redoables.pop()
		this.setState({
			undoables: [...this.state.undoables, toRedo],
			redoables: redoables,
		}, ()=>{
			if (!(typeof toRedo == "undefined")){ // TODO: make this move to next index if any
				this.fabricCanvas.add(toRedo);
				console.log(this.state)}
	})
	}
}



export { undo, redo }