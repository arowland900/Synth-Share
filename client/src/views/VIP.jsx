import React from 'react';
import httpClient from '../httpClient'

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator = audioCtx.createOscillator();

class VIP extends React.Component {
    state = {
        attack: 20,
        decay: 20,
        sustain: 20,
        release: 20,
        waveform: 'sine'
    };

    Note(freq) {
        // adsr:
        console.log(`Playing at ${freq} hz`);
        let { attack, decay, sustain, release, waveform } = this.state;
      
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      
        let vca = audioCtx.createGain()
        vca.gain.value = 0
        vca.connect(audioCtx.destination)
      
        oscillator = audioCtx.createOscillator()
        oscillator.type = waveform
        oscillator.frequency.value = freq
        oscillator.connect(vca)
        oscillator.start()
        console.log(oscillator.frequency.value)
      
        let boostRate = (0.01 / (attack + 1))
        let attenuationRate = (0.01 / (decay))
      
        console.log(attack)
        const fadeIn = () => {
          let fadeInInterval = setInterval(function() {
            vca.gain.value += boostRate
            console.log(vca.gain.value)
          }, 10)
      
          setTimeout(function() {
            clearInterval(fadeInInterval)
            fadeOut()
          }, attack * 100)
        }
      
        fadeIn()
      
        const fadeOut = () => {
          let fadeOutInterval = setInterval(function() {
            // while(vca.gain.value > sus)
            
            vca.gain.value -= attenuationRate
          }, 10)
      
          oscillator.stop(decay)
      
          setTimeout(function() {
            console.log("Ending Gain:", vca.gain.value)
            clearInterval(fadeOutInterval)
            audioCtx.close()
          }, decay * 100)
        }
        
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClick = (e) => {
        e.preventDefault();
        let { freq } = e.target.dataset;
        this.Note(freq)
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        httpClient({ method: 'post', url: '/api/synths', data: this.state })
            .then(apiResponse => {
                console.log(apiResponse)
                // change the following to redirect to the Synth show view instead of home:
                this.props.history.push(`/`)
            })
    }

    render(){

        
        return (
        <div>
            <h3>WaveForm:</h3>
            <form onChange={this.handleChange} onSubmit={this.handleFormSubmit}>
                <select  name="waveform" id="waveform-select">
                    <option value="sine">Sine</option>
                    <option value="triangle">Triangle</option>
                    <option value="square">Square</option>
                    <option value="sawtooth">Sawtooth</option>
                </select>

                <div className="envelope">
                    Attack:
                    <input 
                        className="attack" 
                        type="range"
                        name="attack"
                        value={this.state.attack} 
                        step="1"
                    />
                    Decay:
                    <input 
                        className="decay" 
                        type="range"
                        name="decay"
                        value={this.state.decay} 
                        step="1"
                    />
                    Sustain:
                    <input 
                        className="sustain" 
                        type="range"
                        name="sustain"
                        value={this.state.sustain} 
                        step="1"
                    />
                    Release:
                    <input 
                        className="release" 
                        type="range"
                        name="release"
                        value={this.state.release} 
                        step="1"
                    />
                </div>
                <button>Save Patch</button>
            </form>

            <div id="keyboard">
                <button onClick={this.handleClick} className="key" data-freq="200">SOUND</button>
                <button onClick={this.handleClick} className="key" data-freq="250">SOUND</button>
                <button onClick={this.handleClick} className="key" data-freq="300">SOUND</button>
                <button onClick={this.handleClick} className="key" data-freq="350">SOUND</button>
                <button onClick={this.handleClick} className="key" data-freq="400">SOUND</button>
            </div>
        </div>

        )
    }
}

export default VIP;