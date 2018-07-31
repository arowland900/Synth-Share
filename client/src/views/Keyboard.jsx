import React from 'react';

const notes = {
    a: 220,
    w: 233.08,
    s: 246.94,
    e: 261.63,
    d: 277.18,
    f: 293.66,
    t: 311.13,
    g: 329.63,
    y: 349.23,
    h: 369.99,
    u: 392.00,
    j: 415.30,
    k: 440
}


class Keyboard extends React.Component {

    state = {
        keyDown: null,
        keyUp: null
    }

    componentDidMount() {
        let notePlaying = false
        const playNote = this.props.onPlayNote

        this.setState({
            keyDown: (evt) => {
                if(!notePlaying && notes[evt.key]) {
                    console.log(evt.key)
                    notePlaying = true
                    playNote(notes[evt.key])
                }
            },
            keyUp: (evt) => {
                notePlaying = false
                console.log(evt.key)
            }
        }, () => {
            window.addEventListener('keydown', this.state.keyDown)
            window.addEventListener('keyup', this.state.keyUp)
        }) 
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.state.keyDown)
        window.removeEventListener('keyup', this.state.keyUp)
    }

    render() {
        let { handleClick } = this.props;
        return (
            // <div id="keyboard">
            //     <button onClick={handleClick} className="key" data-freq="200">SOUND</button>
            //     <button onClick={handleClick} className="key" data-freq="250">SOUND</button>
            //     <button onClick={handleClick} className="key" data-freq="300">SOUND</button>
            //     <button onClick={handleClick} className="key" data-freq="350">SOUND</button>
            //     <button onClick={handleClick} className="key" data-freq="400">SOUND</button>
            // </div>
            null
        )
    }
}

export default Keyboard;