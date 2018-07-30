import React from 'react';
import httpClient from '../httpClient'
import SynthForm from './SynthForm';
import SynthView from './SynthView';
import Keyboard from './Keyboard';

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var oscillator = audioCtx.createOscillator();

class ShowSynth extends React.Component {

    state = {
        title: '',
        attack: '',
        decay: '',
        sustain: '',
        release: '',
        waveform: '',
        editEnabled: false
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

    componentDidMount() {
        let id = this.props.match.params.id
        httpClient({ method: 'get', url: `/api/synths/${id}` }).then((apiResponse) => {
            console.log(apiResponse.data.payload)
            this.setState({ ...apiResponse.data.payload })
        })
    }

    handleChange = (evt) => {
        evt.preventDefault();
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        httpClient.editSynth(this.state._id, this.state).then(updatedSynth => {
            this.setState({ editEnabled: false })
        })
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

    enableForm = () => {
        
        this.setState({ editEnabled: true });
    }

    render(){
        let { editEnabled } = this.state; 
        let { currentUser } = this.props
        console.log(currentUser, this.state)
        // console.log(this.state)
        console.log(this.state)
        return (
            <div>
                <h4>WaveForm:</h4>
                {!!editEnabled 
                    ? <SynthForm synth={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} /> 
                    : <SynthView synth={this.state} />
                }
                {currentUser && currentUser._id === this.state._by && <button onClick={this.enableForm}>Edit</button>}
                <Keyboard handleClick={this.handleClick} onPlayNote={this.handleKeyDown} onReleaseNote={this.handleKeyUp} />
        </div>
        )
    }
}

export default ShowSynth