import React from 'react';
import httpClient from '../httpClient';
import SynthForm from './SynthForm';
import Keyboard from './Keyboard';

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator = audioCtx.createOscillator();

class Create extends React.Component {
    state = {
        title: '',
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
        if (e.target.name != undefined) {
            this.setState({ [e.target.name]: e.target.value });
        } else {
            this.setState({ waveform: e.target.innerText });
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        let { freq } = e.target.dataset;
        this.Note(freq)
    } 

    handleKeyDown = (freq) => {
        this.Note(freq)
    }

    handleKeyUp = () => {
        console.log("KEY RELEASED")
    }

    handleSubmit = (e) => {
        e.preventDefault();
        httpClient({ method: 'post', url: '/api/synths', data: this.state })
            .then(apiResponse => {
                // change the following to redirect to the Synth show view instead of home:
                this.props.history.push(`/`)
            })
    }

    render(){

        
        return (
        <div>
            <h1>Create a New Synth Here</h1>
            {/* <h4>WaveForm:</h4> */}
            <SynthForm synth={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />  
            <Keyboard handleClick={this.handleClick} onPlayNote={this.handleKeyDown} onReleaseNote={this.handleKeyUp}/>
        </div>

        )
    }
}

export default Create;