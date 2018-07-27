import React from 'react';

const Keyboard = (props) => {
    let { handleClick } = props;
    return (
        <div id="keyboard">
            <button onClick={handleClick} className="key" data-freq="200">SOUND</button>
            <button onClick={handleClick} className="key" data-freq="250">SOUND</button>
            <button onClick={handleClick} className="key" data-freq="300">SOUND</button>
            <button onClick={handleClick} className="key" data-freq="350">SOUND</button>
            <button onClick={handleClick} className="key" data-freq="400">SOUND</button>
        </div>
    )
}

export default Keyboard;