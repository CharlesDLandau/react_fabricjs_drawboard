import { fabric } from 'fabric'

function  drawGrid(){
    console.log(this.fabricCanvas)
    var w = this.fabricCanvas.get("width")
    var h = this.fabricCanvas.get("height")

    var l1 = new fabric.Line([w*.05, h*.33, w*.95, h*.33], {
      stroke:"black",
      fill: "black",
      strokeWidth: 5,
      selectable:false,
      hasControls:false,
      hasBorders:false,
      evented:false
    })
    var l2 = new fabric.Line([w*.05, h*.66, w*.95, h*.66], {
      stroke:"black",
      fill: "black",
      strokeWidth: 5,
      selectable:false,
      hasControls:false,
      hasBorders:false,
      evented:false
    })

    var l3 = new fabric.Line([w*.33, h*.05, w*.33, h*.95], {
      stroke:"black",
      fill: "black",
      strokeWidth: 5,
      selectable:false,
      hasControls:false,
      hasBorders:false,
      evented:false
    })
    var l4 = new fabric.Line([w*.66, h*.05, w*.66, h*.95], {
      stroke:"black",
      fill: "black",
      strokeWidth: 5,
      selectable:false,
      hasControls:false,
      hasBorders:false,
      evented:false

    })
    
    this.grid.add(l1, l2, l3, l4)

    this.fabricCanvas.add(l1, l2, l3, l4, this.grid)
  }
export default drawGrid