//basically to intercept incoming requests and perform functions before calling out the API endpoints
//Since it is much easier to use an auth token than to continuously validate user credentials
const jwt = require('jsonwebtoken');
const config = require('config');

function authMiddleware(req, res, next) {
    //store user's token in var
    const token = req.header('Authorization');

    try {
        // Verify the token using JWT
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Set the user object in the request
        req.user = decoded.user;

        // Proceed to the next middleware or route handler
        next();
      } catch (err) {
        // Handle token verification errors
        res.status(401).json({ msg: 'Invalid token' });
      }
}

module.exports = authMiddleware;
