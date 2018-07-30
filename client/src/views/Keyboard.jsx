import React from 'react';

const notes = {
    a: 200,
    s: 250,
    d: 300,
    f: 350,
    g: 400
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
            <div id="keyboard">
                <button onClick={handleClick} className="key" data-freq="200">SOUND</button>
                <button onClick={handleClick} className="key" data-freq="250">SOUND</button>
                <button onClick={handleClick} className="key" data-freq="300">SOUND</button>
                <button onClick={handleClick} className="key" data-freq="350">SOUND</button>
                <button onClick={handleClick} className="key" data-freq="400">SOUND</button>
            </div>
        )
    }
}

export default Keyboard;