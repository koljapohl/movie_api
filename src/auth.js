const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const jwtSecret = 'your_jwt_secret'; //must be the same one defined within JWT Strategy!

const jwt = require('jsonwebtoken'),
    passport = require('passport');

require('./passport.js');

/** 
 * generate a JWT
 * @param {object} user
 * @returns {string} JWT-token
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

/** 
 * user login
 * @method POST
 * @param {object} (username, password) credentials 
 * @returns {object} (user, token)
 */
module.exports = (router) => {
    router.post('/login',
        cors(), (req, res) => {
            passport.authenticate('local', { session: false }, (error, user) => { // user is returned from local strategy
                if (error || !user) {
                    return res.status(400).json({
                        message: 'Something went wrong',
                        user: user
                    });
                }
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    let token = generateJWTToken(user.toJSON());
                    return res.status(200).json({ user, token }); //ES6 shorthand for {user: user, token: token} !!
                });
            })(req, res);
        });
};
