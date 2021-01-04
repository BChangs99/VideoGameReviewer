const jwt = require('jsonwebtoken');
const config = require('config');

//This file enables us to do a lot of things in our api routes
//1. Lets us check if the users token is valid, by decoding with jwt and verifying with what we have in the db
//2. It lets us find the user that is trying to log in and lets us do stuff with that data
//This func will then add to the req param the user we have decodedd for us to use in the actual api route
module.exports = function (req, res, next) {
    //Get Token from header
    const token = req.header('x-auth-token');

    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    //Verify token
    try {
        //Compares token in requests header by decoding it
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        //After token is decoded and verified to be the user, we can then use the req.user in any of our protected
        //routes (b/c it lives in the req obj)
        req.user = decoded.user
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" })
    }
}