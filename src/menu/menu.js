import React from 'react';
import menuButton from '../assets/line.3.horizontal.svg';
import '../App.css';

export function Menu(props) {

    function handleNewGame(e) {
        props.setNewGameState(true);
        props.setAboutState(false);
        props.setRulesState(false);
    }

    function handleAbout(e) {
        props.setAboutState(true);
        props.setNewGameState(false);
        props.setRulesState(false);
    }

    function handleRules(e) {
        props.setRulesState(true);
        props.setNewGameState(false);
        props.setAboutState(false);
    }


    return (
        <div className="menu">
            <div className='menuItems'>
                <button onClick={handleNewGame} className='menuItemButton'>New Game</button>
                <button onClick={handleRules} className='menuItemButton'>Rules</button>
                <button className='menuItemButton'>Settings</button>
                <button onClick={handleAbout} className='menuItemButton'>About</button>
            </div>
        </div>
    )

}

export function NewGame(props) {

    function handleNewGame(e) {
        props.setNewGameState(!props.newGameState);
        console.log(props.newGameState);
    }
    
    return (
        <div className='newGame'>
            <h2 className='newGameTitle'>Choose number of players:</h2>
            <div className='playerNumberButtons'>
                <button className='playerNumberButton' onClick={() => {
                props.setNumPlayers(2);
                handleNewGame();
                props.setMenu(false);
                props.forceRedraw(props.redraw + 1);
                }}>2</button>

                <button className='playerNumberButton' onClick={() => {
                props.setNumPlayers(3);
                handleNewGame();
                props.setMenu(false);
                props.forceRedraw(props.redraw + 1);
                }}>3</button>

                <button className='playerNumberButton' onClick={() => {
                props.setNumPlayers(4);
                handleNewGame();
                props.setMenu(false);
                props.forceRedraw(props.redraw + 1);
                }}>4</button>
            </div>
            <button onClick={handleNewGame} className='newGameClose'>Close</button>
        </div>
    )
}

export function Overlay() {
    return (
        <div className='overlay'></div>
    )
}