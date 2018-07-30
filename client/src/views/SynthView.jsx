import React from 'react';
import { Segment, Form, Button, Input, Select} from 'semantic-ui-react'

let options = [
    { key: "sine", value: "sine", text: "sine" },
    { key: "triangle", value: "triangle", text: "triangle" },
    { key: "square", value: "square", text: "square" },
    { key: "sawtooth", value: "sawtooth", text: "sawtooth" }
];

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