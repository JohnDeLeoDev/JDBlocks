
import './App.css';
import React from 'react';
import Model from './model/model.js';
import { config } from './model/config.js';
import { redrawCanvas } from './boundary/boundary.js';
import { layout } from './boundary/layout';
import { BOXSIZE } from './boundary/boundary.js';

function App() {
  const [model] = React.useState(new Model(config));
  const [redraw] = React.useState(0);    
  const canvasRef = React.useRef(null);  

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current);
  }, [model, redraw]);

  const handleClick = (event) => {
    
  }

  return (
    <div style = {layout.Appmain} className="App">
      <div style={layout.canvasArea}>
        <canvas tabIndex="1"
          className="App-canvas"
          ref ={canvasRef}
          width={600}
          height={600}
          style={layout.canvas}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
