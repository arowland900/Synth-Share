const Synth = require('../models/Synth.js');


module.exports = {
    // list all synths:
    index: (req, res) => {
		Synth.find({}, (err, synths) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: synths})
		})
    },
    
    // show one synth:
	show: (req, res) => {
		Synth.findById(req.params.id, (err, synth) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: synth })
		})
	},

    // create new synth:
    create: (req, res) => {
        Synth.create({ ...req.body, _by: req.user._id }, (err, synth) => {
            if(err) return console.log(err)
            res.json({ message: "SUCCESS", payload: synth })
        })
    },

    // update an existing user
	update: (req, res) => {
        console.log('HITT')
		Synth.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSynth) => {
            if(err) return res.json({ message: "ERROR", payload: null })
            res.json({ message: "SUCCESS", payload: updatedSynth })
			
			})
	},

	// delete an existing synth
	destroy: (req, res) => {
		// User.findByIdAndRemove(req.params.id, (err, user) => {
		Synth.findByIdAndRemove(req.params.id, (err, deletedSynth) => {
			if(err) return res.json({message: "ERROR", payload: null, code: err.code})
			res.json({ message: "SUCCESS", payload: deletedSynth })
		})
		// })
	},
}