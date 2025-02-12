const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')

// @route  GET api/profile/me
// @desc   Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        //The await Profile.findOne is going to look through the property 'user' that all profiles have
        //looking for req.user.id
        //The .populate function will let us further ADD from the user model the properties 'name' and 
        //'avatar', which were not properties of profile
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private

//To put multiple middlewares, you use a bracket to put them in
//e.g. router.post('/', [MIDDLEWARE1, MIDDLEWARE2], () => {})
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { bio, location, status } = req.body;

    //Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;

    if (bio) {
        profileFields.bio = bio;
    }

    if (location) {
        profileFields.location = location;
    }

    if (status) {
        profileFields.status = status;

    }

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            //If we find a profile, findOneAndUpdate will update the profile with the new profilefields that have been set
            //It finds the profile using the user id
            //It updates the data with profileFields
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile)
        }

        //If not found, we create the profile
        profile = new Profile(profileFields);

        await profile.save();
        res.json(profile)

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
})

// @route  GET api/profile
// @desc   Get all profiles
// @access Public

router.get('/', async (req, res) => {
    try {
        //find() will find every profile there is, and also include their name and avatar fields from the user model
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
})

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: "Profile not found" })
        }

        res.json(profile)

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Profile not found" })
        }
        res.status(500).send('Server Error')

    }
})

// @route  DELETE api/profile
// @desc   Delete profile and user
// @access Private

router.delete('/', auth, async (req, res) => {
    try {
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id })
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: "User Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})


module.exports = router;