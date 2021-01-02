const express = require('express');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator')
const User = require('../../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('config')

const router = express.Router();

// @route  POST api/users
// @desc   Register user
// @access Public

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // See if user exists
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (user) {
            //Want to make errors the data format as our other error above for isEmpty
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
        }
        // Get users Gravatar
        //s is size, r is rating (parental rating), d is default

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        //Encrypt password using bcrypt
        //Salt for our password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        //Return JWT (so user can be authenticated with the token right away and access the site fully)
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,
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