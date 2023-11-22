
import './App.css';
import React from 'react';
import Model from './model/model.js';
import { config } from './model/config.js';
import {Canvas, updateSizes} from './boundary/boundary.js';
import { rotatePiece, nextPlayer, flipPiece } from './controller/controller';
import rotateLeft from './assets/rotate.left.svg';
import rotateRight from './assets/rotate.right.svg';
import fliphorizontal from './assets/flip.horizontal.svg';
import flipvertical from './assets/flip.vertical.svg';
import menuButton from './assets/line.3.horizontal.svg';
import {Menu, NewGame, Overlay} from './menu/menu.js';
import {About} from './about.js';
import {Rules} from './rules.js';

function App() {
  updateSizes();
  const [model] = React.useState(new Model(config));
  const [redraw, forceRedraw] = React.useState(0);    
  const [menu, setMenu] = React.useState(false);
  const [newGameState, setNewGameState] = React.useState(false);
  const [aboutState, setAboutState] = React.useState(false);
  const [rulesState, setRulesState] = React.useState(false);

  function handleRedraw() {
    forceRedraw(redraw + 1);
  }

  function handleCookie() {
    localStorage.setItem('model', model);
  }

  function setNumPlayers(numPlayers) {
    model.setNumPlayers(numPlayers);
  }

  function handleMenu() {
    if (menu) {
      setNewGameState(false);
      setAboutState(false);
      setRulesState(false);
    }
    setMenu(!menu);
  }

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
        document.body.style.overflow = "scroll"
    };
  }, []);

  return (
    <div className="Appmain">


      <div className="header">
        <div className="brand">
          <h1 className="brandText">JDBlocks</h1>
        </div>
          <button className='menuButton'onClick={handleMenu}>
            <img className="menuSVG" src={menuButton} alt="Menu"/>
          </button>
      </div>



        <div className="gameArea">
          {menu && <Overlay/>}

          <div className="buttonsArea">
            <div className="playerSelect">
              <h1 className="playerSelectText">Player {model && model.currentPlayer + 1}'s Turn</h1>
              <button className="skipTurn" onClick={() => {
                nextPlayer(model);
                forceRedraw(redraw + 1);
              }}>
                Skip Turn
              </button>
            </div>

            <div className="pieceOrientationArea">
              <h1 className="pieceOrientationText">Piece Orientation</h1>
              <div className="pieceOrientationButtons">
                <button className="pieceOrientation" onClick={() => {
                  flipPiece(model, false);
                  forceRedraw(redraw + 1);
                }}>
                  <img className="flipSVG" src={fliphorizontal} alt="Flip Horizontal"/>
                </button>
                <button className="pieceOrientation" onClick={() => {
                  flipPiece(model, true);
                  forceRedraw(redraw + 1);
                }}>
                  <img className="flipSVG" src={flipvertical} alt="Flip Vertical"/>
                </button>
                <button className="pieceOrientation" data-testid="counterclockwise" onClick={() => {
                            rotatePiece(model, false);
                            forceRedraw(redraw + 1);
                }}>
                  <img className="pieceOrientationSVG" src={rotateLeft} alt="Rotate Counterclockwise"/>
                </button>
                <button className="pieceOrientation" data-testid="clockwise" onClick={() => {
                  rotatePiece(model, true);
                  forceRedraw(redraw + 1);
                }}>
                  <img className="pieceOrientationSVG" src={rotateRight} alt="Rotate Clockwise"/>
                </button>
              </div>
            </div>

        </div>
      
        <div className="canvasArea">
          <Canvas
            model={model}
            redraw={redraw}
            handleRedraw={handleRedraw}
            handleCookie={handleCookie}
          />
        </div>
        
      </div>
      {menu && <Menu 
      setMenu={setMenu} 
      menu={menu} 
      newGameState={newGameState}
      setNewGameState={setNewGameState}
      setAboutState={setAboutState}
      setRulesState={setRulesState}
      />}
      {(newGameState && menu) && <NewGame 
      redraw={redraw} 
      forceRedraw={forceRedraw} 
      menu={menu}
      setMenu={setMenu}
      setNumPlayers={setNumPlayers}
      setNewGameState={setNewGameState}
      newGameState={newGameState}
      />}
      {(aboutState && menu) && <About/>}
      {(rulesState && menu) && <Rules/>}
    </div>
  );
}

export default App;

