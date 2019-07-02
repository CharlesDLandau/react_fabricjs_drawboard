# react_fabricjs_drawboard
Simplistic react component with draw tools based on FabricJS. Demo: https://react-drawboard.charlesdlandau.now.sh/

I wrote this to demonstrate how to create FabricJS drawing tools in a GUI using ReactJS. It was written pre-hooks and I have no plans to transition the project to hooks.

### `Board.js`
Just handles the FabricJS canvas object.

### `DrawBoard.js`
Displays the canvas, the buttons, and applies the `utils`

### `utils`

1. doStack.js
Handles the undo and redo features
2. eventHandlers
Handles the mouse events (Up Down, moving) with fabricJS methods -- the actual drawing features are implemented here.
