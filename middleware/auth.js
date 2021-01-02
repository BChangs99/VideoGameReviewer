const jwt = require('jsonwebtoken');
const config = require('config');

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