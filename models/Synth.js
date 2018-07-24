const
	mongoose = require('mongoose'),
	synthSchema = new mongoose.Schema({
		name: { type: String },
		attack: { type: Number, required: true },
		decay: { type: Number, required: true },
		waveform: { type: String, required: true }
	})


const Synth = mongoose.model('Synth', synthSchema)
module.exports = Synth