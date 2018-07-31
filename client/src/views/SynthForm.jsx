import React from 'react';
import { Segment, Form, Button, Input, Select} from 'semantic-ui-react'

const SynthForm = (props) => {
    let { title, attack, decay, sustain, release, waveform } = props.synth;
    let { handleChange, handleSubmit } = props;
    let options = [
        { key: "sine", value: "sine", text: "Sine" },
        { key: "triangle", value: "triangle", text: "Triangle" },
        { key: "square", value: "square", text: "Square" },
        { key: "sawtooth", value: "sawtooth", text: "Sawtooth" }
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
           
            <Form inverted onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Input  
                        name="title" 
                        // type="form"
                        value={title}
                        placeholder="Title" 
                        onChange={handleChange}
                        width={6}
                    />
                    <Form.Input
                        placeholder="Waveform"
                        control={Select}
                        options={options}
                        onChange={handleChange}
                        name="waveform"
                        width={4}
                    />
                </Form.Group>

                <div className="envelope">
                    Attack:
                    <Form.Input 
                        className="attack" 
                        type="range"
                        name="attack"
                        value={attack} 
                        step="1"
                        onChange={handleChange}
                    />
                    Decay:
                    <Form.Input 
                        className="decay" 
                        type="range"
                        name="decay"
                        value={decay} 
                        step="1"
                        onChange={handleChange}
                    />
                    {/* Sustain:
                    <Form.Input 
                        className="sustain" 
                        type="range"
                        name="sustain"
                        value={sustain} 
                        step="1"
                        onChange={handleChange}
                    />
                    Release:
                    <Form.Input 
                        className="release" 
                        type="range"
                        name="release"
                        value={release} 
                        step="1"
                        onChange={handleChange}
                    /> */}
                </div>
                <Button type="submit">Save Patch</Button>
            </Form>
        </Segment>
    )
};

export default SynthForm;