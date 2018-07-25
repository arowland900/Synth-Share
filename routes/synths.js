const
	express = require('express'),
	synthsRouter = new express.Router(),
	synthsCtrl = require('../controllers/synths.js'),
	{ verifyToken } = require('../serverAuth')

synthsRouter.get('/', synthsCtrl.index)
synthsRouter.get('/:id', synthsCtrl.show)

synthsRouter.use(verifyToken)
synthsRouter.post('/', synthsCtrl.create)
// synthsRouter.patch('/me', synthsCtrl.update)
// synthsRouter.delete('/me', synthsCtrl.destroy)

module.exports = synthsRouter