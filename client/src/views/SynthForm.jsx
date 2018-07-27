import React from 'react';

const SynthForm = (props) => {
    let { title, attack, decay, sustain, release, waveform } = props.synth;
    let { handleChange, handleSubmit } = props;
    return (
        <form onChange={handleChange} onSubmit={handleSubmit}>
            <input  
                name="title" 
                value={title}
                placeholder="Title" 
                />
                <select name="waveform" id="waveform-select" value={waveform}>
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
                <button>Save Patch</button>
            </form>
    )
};

export default SynthForm;