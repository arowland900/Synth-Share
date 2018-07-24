import React from 'react';

// var release = document.querySelector('#release')
// var attack = document.querySelector('#attack')
// var waveformSelect = document.querySelector('#waveform-select')
var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// function release(time) {
//   oscillator.stop(time);

//   //
//   console.log("Stop playing!")
// }

// // event listeners for all keys:
// keys.forEach(function(key) {
//   key.addEventListener('mousedown', function() {
//     this.freq = Number(this.dataset.freq)
//     new Note(this.freq)
//   })

//  
// })



class VIP extends React.Component {

    // // var keyboard = document.querySelector('#keyboard')
// var keys = document.querySelectorAll('#keyboard button.key')

    constructor(props) {
        super(props);
        this.state = {
            attackValue: 20,
            releaseValue: 20,
            waveformSelect: 'square'
            // attack: ,
            // release: ,
            // waveformSelect: 
        };

        this.handleClick = this.handleClick.bind(this);
    }

    Note(freq) {
        // adsr:
        console.log(`Playing at ${freq} hz`);
        let { attackValue, releaseValue, waveformSelect } = this.state;
        let attack = (attackValue / 20);
        let release = (releaseValue / 20);
        console.log(`Attack: ${attack}, Release: ${release}`);
        console.log(waveformSelect)
      
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
      
        let attackTime = (this.state.attackValue)
        console.log(attackTime)
        let releaseTime = (this.state.releaseValue)
        let initialGain = vca.gain.value
        let boostRate = (0.01 / (attackTime))
        let attenuationRate = (0.01 / (releaseTime))
      
        const fadeIn = () => {
          let fadeInInterval = setInterval(function() {
            vca.gain.value += boostRate
          }, 10)
      
          setTimeout(function() {
            clearInterval(fadeInInterval)
            fadeOut()
          }, attackTime * 1000)
        }
      
        fadeIn()
      
        const fadeOut = () => {
          let fadeOutInterval = setInterval(function() {
            vca.gain.value -= attenuationRate
          }, 10)
      
          oscillator.stop(releaseTime)
      
          setTimeout(function() {
            console.log("Ending Gain:", vca.gain.value)
            clearInterval(fadeOutInterval)
            audioCtx.close()
          }, releaseTime * 1000)
        }
      
        fadeOut()    
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
                <option value="sawtooth">Sawtooth</option>
                <option defaultValue="square">Square</option>
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

            {/* <script src="js/app.js" charSet="utf-8"></script> */}

        </div>

        )
    }
}

export default VIP;