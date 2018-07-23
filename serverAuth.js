const
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js'),
    { JWT_SECRET } = process.env


function signToken(user){
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, JWT_SECRET)
}

function verifyToken(req, res, next){
    // get token from the headers of the incoming request:
    const token = req.get('token')
    // if no token, deny access:
    if(!token) return res.json({ message: "Error", error: "No Token provided"})
    // otherwise, ty to verify token:
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        // if verification error, deny access:
        if(err) return res.json({ message: "Error", error: "Invalid Token"})
        // otherwise, search for user by id that was embedded in token:
        User.findById(decodedData._id, (err, user) => {
            // if no user, deny access
            if(!user) return res.json({ message: "Error", error: "Invalid Token" })
            // add the user to the request object (the current user):
            req.user = user
            // go on to process the route:
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}