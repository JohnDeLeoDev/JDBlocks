export function Rules() {

    return (
        <div className='rules'>
            <h2 className='rulesTitle'>Rules</h2>
            <p className='rulesText'>The game begins with each player placing their first piece in their respective corner.</p>
            <p className='rulesText'>Each subsequent piece must be placed such that it touches a corner of one of the player's other pieces, but it must not share an edge with any of the player's other pieces.</p>
            <p className='rulesText'>The game ends when no player can place any more pieces.</p>
            <p className='rulesText'>The winner is the player with the fewest squares left in their remaining pieces.</p>
            <p className='rulesText'>See my other work at <a href="https://johndeleo.dev">JohnDeLeo.dev</a></p>
        </div>
    )

}