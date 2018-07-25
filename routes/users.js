const
	express = require('express'),
	usersRouter = new express.Router(),
	usersCtrl = require('../controllers/users.js'),
	{ verifyToken } = require('../serverAuth')

usersRouter.get('/', usersCtrl.index)
usersRouter.post('/', usersCtrl.create)
usersRouter.get('/:id', usersCtrl.show)

usersRouter.post('/authenticate', usersCtrl.authenticate)

usersRouter.use(verifyToken)
usersRouter.patch('/me', usersCtrl.update)
usersRouter.delete('/me', usersCtrl.destroy)

module.exports = usersRouter