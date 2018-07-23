import React from 'react';

const VIP = (props) => {
    return (
    <div>
        <h3>WaveForm:</h3>
        <select id="waveform-select">
        <option value="sine">Sine</option>
        <option value="triangle">Triangle</option>
        <option value="sawtooth">Sawtooth</option>
        <option selected value="square">Square</option>
        </select>

        <div className="envelope">
        <h3>Envelope:</h3>
        {/* Attack:
        <input id="attack" type="range" value="20">
        Release:
        <input id="release" type="range" value="20"> */}
        </div>

        <div id="keyboard">
        <button class="key" data-freq="200">SOUND</button>
        <button class="key" data-freq="250">SOUND</button>
        <button class="key" data-freq="300">SOUND</button>
        <button class="key" data-freq="350">SOUND</button>
        <button class="key" data-freq="400">SOUND</button>
        </div>

        <script src="js/app.js" charset="utf-8"></script>

    </div>

    )
}

export default VIP;