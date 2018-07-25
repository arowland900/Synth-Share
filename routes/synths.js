const
	express = require('express'),
	synthsRouter = new express.Router(),
	synthsCtrl = require('../controllers/synths.js'),
	{ verifyToken } = require('../serverAuth')

synthsRouter.get('/', synthsCtrl.index)
synthsRouter.get('/:id', synthsCtrl.show)

synthsRouter.use(verifyToken)
synthsRouter.patch('/:id', synthsCtrl.update)
synthsRouter.post('/', synthsCtrl.create)
synthsRouter.delete('/:id', synthsCtrl.destroy)

module.exports = synthsRouter