const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//encrypt pass
const bcrypt = require('bcryptjs');
//Create token for logins/registering
const jwt = require('jsonwebtoken');
const config = require('config');

//For the user model
const User = require('../models/User');

//auth
const auth = require('../middleware/auth');


// @route POST api/users
// @desc Register user
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 }),
],
    async (req, res) => {

        //If there are any errors then return them
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //fetch vars 
        const { name, email, password } = req.body;

        //Check if user exists in database
        try {
            let user = await User.findOne({ email });

            //if found then tell user  it already exists
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

            //otherwise create a user
            user = new User({
                name,
                email,
                password
            });

            //encrypt password and set it 
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //save it to db
            await user.save();

            //JWToken so we don't have to keep checking for credentials for every request user makes
            // return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            //if we get an error in process
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });


//Get user if they exist?
router.get('/me', auth, check('id', 'id is required').not().isEmpty(),
    async (req, res) => {
        try {
            const profile = await Profile.findOne({
                user: req.user.id,
            });

            if (!profile) {
                return res.status(400).json({ msg: 'There is no profile for this user' });
              }
        } catch (err) {

        }
    });

//EXPORT IT!!
module.exports = router;