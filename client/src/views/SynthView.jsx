import React from 'react';
import { Segment, Form, Button, Input, Select} from 'semantic-ui-react'



const SynthView = (props) => {
    // let { currentUser } = this.props
    let { attack, decay, sustain, release, waveform, title } = props.synth;
    let options = [
        { key: "sine", value: "sine", text: "sine" },
        { key: "triangle", value: "triangle", text: "triangle" },
        { key: "square", value: "square", text: "square" },
        { key: "sawtooth", value: "sawtooth", text: "sawtooth" }
    ];
    return (
        <Segment inverted>
            {/* <Form inverted> */}
            {/* <Form.Group widths='equal'> */}
                {/* <Form.Input fluid label='First name' placeholder='First name' />
                <Form.Input fluid label='Last name' placeholder='Last name' /> */}
            {/* </Form.Group> */}
            {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
            {/* <Button type='submit'>Submit</Button> */}
            {/* </Form> */}
 
            <Form inverted >
                <h3>{title}</h3>
                <h3 className="ui right aligned">waveform: {waveform}</h3>
                {/* <Form.Group>
                    <Form.title
                        name="title" 
                        // type="form"
                        value={title}
                        placeholder="Title" 
                        width={6}
                    />
                    <Select placeholder="Waveform" options={options} value={waveform} name="waveform" width={4}/>
                    <select name="waveform" id="waveform-select" value={waveform} onChange={handleChange}>
                        <option value="sine">Sine</option>
                        <option value="triangle">Triangle</option>
                        <option value="square">Square</option>
                        <option value="sawtooth">Sawtooth</option>
                    </select>
                </Form.Group> */}

                <div className="envelope">
                    Attack:
                    <Input 
                        className="attack" 
                        type="range"
                        name="attack"
                        value={attack} 
                        step="1"
                    />
                    Decay:
                    <Input 
                        className="decay" 
                        type="range"
                        name="decay"
                        value={decay} 
                        step="1"
                    />
                    Sustain:
                    <Input 
                        className="sustain" 
                        type="range"
                        name="sustain"
                        value={sustain} 
                        step="1"
                    />
                    Release:
                    <Input 
                        className="release" 
                        type="range"
                        name="release"
                        value={release} 
                        step="1"
                    />
                </div>
                {/* {currentUser && currentUser._id === this.state._by && <Button className="button" onClick={this.enableForm}>Edit</Button>} */}
            </Form>
        </Segment>
        // <div className="envelope">
        //     <h1>{title}</h1>
        //     <h3>{waveform}</h3>
        //     Attack:
        //     <input 
        //         className="attack" 
        //         type="range"
        //         name="attack"
        //         value={attack} 
        //         step="1"
        //     />
        //     Decay:
        //     <input 
        //         className="decay" 
        //         type="range"
        //         name="decay"
        //         value={decay} 
        //         step="1"
        //     />
        //     Sustain:
        //     <input 
        //         className="sustain" 
        //         type="range"
        //         name="sustain"
        //         value={sustain} 
        //         step="1"
        //     />
        //     Release:
        //     <input 
        //         className="release" 
        //         type="range"
        //         name="release"
        //         value={release} 
        //         step="1"
        //     />
        // </div>
    )
}

export default SynthView;