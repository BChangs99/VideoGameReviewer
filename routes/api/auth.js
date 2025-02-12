const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken');


// @route  GET api/auth
// @desc   Test users api route
// @access Public

router.get('/', auth, async (req, res) => {
    try {
        //.select('-password') will remove the password
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// @route  POST api/auth
// @desc   Authenticate user and get token
// @access Public

router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // See if user exists
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            //Want to make errors the data format as our other error above for isEmpty -- easier for frontend to handle
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }

        //Compares encrypted passwords in db and user entered password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        //Return JWT (so user can be authenticated with the token right away and access the site fully)
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) {
                    throw err
                }

                res.json({ token })
            })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

module.exports = router;