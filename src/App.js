
import './App.css';
import React from 'react';
import Model from './model/model.js';
import { config } from './model/config.js';
import { redrawCanvas } from './boundary/boundary.js';
import { layout } from './boundary/layout';
import { BOXSIZE } from './boundary/boundary.js';
import { movePiece, selectPiece, movePieceToBoard, rotatePiece, nextPlayer, prevPlayer } from './controller/controller';
import rotateLeft from './assets/rotate.left.svg';
import rotateRight from './assets/rotate.right.svg';
import nextArrow from './assets/arrowshape.right.svg';
import prevArrow from './assets/arrowshape.left.svg';

function App() {
  const [model] = React.useState(new Model(config));
  const [redraw, forceRedraw] = React.useState(0);    
  const canvasRef = React.useRef(null);  

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current);
  }, [model, redraw]);

  const mouseHandler = (event) => {
    if (event._reactName === "onMouseDown") {
      selectPiece(model, event);
    } else if (event._reactName === "onMouseMove" && event.buttons === 1 && model.players[model.currentPlayer].selectedPiece) {
      movePiece(model, event);
    } else if (event._reactName === "onMouseUp" && model.players[model.currentPlayer].selectedPiece) {
      movePieceToBoard(model);
    }
    forceRedraw(redraw + 1);
  }

  function setNumPlayers(numPlayers) {
    model.setNumPlayers(numPlayers);
  }

  return (
    <div style={layout.Appmain} className="App">
      <div style={layout.header}>
        <div style={layout.brand}>
          <h1 style={layout.brandText}>Blokus</h1>
        </div>
        <div style={layout.players}>
          <p style={layout.playerText}>Choose number of players:</p>
          <div style={layout.playersButtons}>
            <button onClick={() => {
              setNumPlayers(2);
              forceRedraw(redraw + 1);
            }}>2</button>
          </div>
          <div style={layout.playersButtons}>
            <button onClick={() => {
              setNumPlayers(3);
              forceRedraw(redraw + 1);
            }}>3</button>
          </div>
          <div style={layout.playersButtons}>
            <button onClick={() => {
              setNumPlayers(4);
              forceRedraw(redraw + 1);
            }}>4</button>
          </div>
        </div>
      </div>
      <div style={layout.buttonsArea}>
        <div style={layout.rotate}>
          <p style={layout.rotateText}>Rotate piece:</p>
          <button style={layout.rotateButtons} data-testid="counterclockwise" onClick={() => {
                      rotatePiece(model, false);
                      forceRedraw(redraw + 1);
          }}>
            <img style={layout.rotateSVG} src={rotateLeft} alt="Rotate Counterclockwise"/>
          </button>
          <button style={layout.rotateButtons} data-testid="clockwise" onClick={() => {
            rotatePiece(model, true);
            forceRedraw(redraw + 1);
          }}>
            <img style={layout.rotateSVG} src={rotateRight} alt="Rotate Clockwise"/>
          </button>
        </div>
        <div style={layout.playerSelect}>
          <div>
          <p style={layout.playerText}>Player {model.currentPlayer + 1}'s Turn</p>
          </div>
          <button style={layout.playerChange} data-testid="prevPlayer" onClick={() => {
            prevPlayer(model);
            forceRedraw(redraw + 1);
          }}>
            <img style={layout.playerChangeSVG} src={prevArrow} alt="Rotate Clockwise"/>
          </button>
          <button style={layout.playerChange} data-testid="nextPlayer" onClick={() => {
            nextPlayer(model);
            forceRedraw(redraw + 1);
          }}>
            <img style={layout.playerChangeSVG} src={nextArrow} alt=""/>
          </button>
        </div>
      </div>
      <div style={layout.canvasArea}>
        <canvas tabIndex="1"
          className="App-canvas"
          ref ={canvasRef}
          width={2400}
          height={2400}
          style={layout.canvas}
          onMouseDown={mouseHandler}
          onMouseMove={mouseHandler}
          onMouseUp={mouseHandler}
        />
      </div>
    </div>
  );
}

export default App;

