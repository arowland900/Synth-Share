import React from 'react';
import httpClient from '../httpClient'

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator = audioCtx.createOscillator();




class VIP extends React.Component {
    state = {
        attackValue: 20,
        decayValue: 20,
        sustainValue: 20,
        releaseValue: 20,
        waveformSelect: 'sine'
    };

    Note(freq) {
        // adsr:
        console.log(`Playing at ${freq} hz`);
        let { attackValue, decayValue, sustainValue, releaseValue, waveformSelect } = this.state;
      
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      
        let vca = audioCtx.createGain()
        vca.gain.value = 0
        vca.connect(audioCtx.destination)
      
        oscillator = audioCtx.createOscillator()
        oscillator.type = waveformSelect
        oscillator.frequency.value = freq
        oscillator.connect(vca)
        oscillator.start()
        console.log(oscillator.frequency.value)
      
        let boostRate = (0.01 / (attackValue))
        let attenuationRate = (0.01 / (decayValue))
      
        const fadeIn = () => {
          let fadeInInterval = setInterval(function() {
            vca.gain.value += boostRate
            console.log(vca.gain.value)
          }, 10)
      
          setTimeout(function() {
            clearInterval(fadeInInterval)
            fadeOut()
          }, attackValue * 100)
        }
      
        fadeIn()
      
        const fadeOut = () => {
          let fadeOutInterval = setInterval(function() {
            // while(vca.gain.value > sus)
            
            vca.gain.value -= attenuationRate
          }, 10)
      
          oscillator.stop(decayValue)
      
          setTimeout(function() {
            console.log("Ending Gain:", vca.gain.value)
            clearInterval(fadeOutInterval)
            audioCtx.close()
          }, decayValue * 100)
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

    render(){

        
        return (
        <div>
            <h3>WaveForm:</h3>
            <select onChange={this.handleChange} name="waveformSelect" id="waveform-select">
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
                    name="attackValue"
                    value={this.state.attackValue} 
                    onChange={this.handleChange}
                    step="1"
                />
                Decay:
                <input 
                    className="decay" 
                    type="range"
                    name="decayValue"
                    value={this.state.decayValue} 
                    onChange={this.handleChange}
                    step="1"
                />
                Sustain:
                <input 
                    className="sustain" 
                    type="range"
                    name="sustainValue"
                    value={this.state.sustainValue} 
                    onChange={this.handleChange}
                    step="1"
                />
                Release:
                <input 
                    className="release" 
                    type="range"
                    name="releaseValue"
                    value={this.state.releaseValue} 
                    onChange={this.handleChange}
                    step="1"
                />
            </div>

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