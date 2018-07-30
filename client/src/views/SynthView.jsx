import React from 'react';

const SynthView = (props) => {
    let { attack, decay, sustain, release, waveform, title } = props.synth;
    return (
        <div className="envelope">
            <h1>{title}</h1>
            <h3>{waveform}</h3>
            Attack:
            <input 
                className="attack" 
                type="range"
                name="attack"
                value={attack} 
                step="1"
            />
            Decay:
            <input 
                className="decay" 
                type="range"
                name="decay"
                value={decay} 
                step="1"
            />
            Sustain:
            <input 
                className="sustain" 
                type="range"
                name="sustain"
                value={sustain} 
                step="1"
            />
            Release:
            <input 
                className="release" 
                type="range"
                name="release"
                value={release} 
                step="1"
            />
        </div>
    )
}

export default SynthView;