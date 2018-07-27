const
	mongoose = require('mongoose'),
	synthSchema = new mongoose.Schema({
		title: { type: String },
		attack: { type: Number, required: true },
		decay: { type: Number, required: true },
		sustain: { type: Number, required: true },
		release: { type: Number, required: true },
		waveform: { type: String, required: true },
		_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	})


const Synth = mongoose.model('Synth', synthSchema)
module.exports = Synth