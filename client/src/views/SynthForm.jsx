import React from 'react';

const SynthForm = (props) => {
    let { title, attack, decay, sustain, release, waveform } = props.synth;
    let { handleChange, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <input  
                name="title" 
                // type="form"
                value={title}
                placeholder="Title" 
                onChange={handleChange}
            />
            <select name="waveform" id="waveform-select" value={waveform} onChange={handleChange}>
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
                    value={attack} 
                    step="1"
                    onChange={handleChange}
                />
                Decay:
                <input 
                    className="decay" 
                    type="range"
                    name="decay"
                    value={decay} 
                    step="1"
                    onChange={handleChange}
                />
                Sustain:
                <input 
                    className="sustain" 
                    type="range"
                    name="sustain"
                    value={sustain} 
                    step="1"
                    onChange={handleChange}
                />
                Release:
                <input 
                    className="release" 
                    type="range"
                    name="release"
                    value={release} 
                    step="1"
                    onChange={handleChange}
                />
            </div>
            <button>Save Patch</button>
        </form>
    )
};

export default SynthForm;