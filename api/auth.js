const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//For the user model
const User = require('../models/User');

//When user logs in
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'password is required').exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        //Check if errors exist
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // see if user exists
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // compare the user input password with the encrypted password in db
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid credentials' }] });
            }

            // return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            //This is so we get token
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
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;