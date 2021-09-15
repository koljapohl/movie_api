const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

/**
* Defines a local authentication strategy for user login
*/
passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + ': ' + password);
    Users.findOne({ Username: username }, (error, user) => {
        if (error) {
            console.error(error);
            return callback(error);
        }

        if (!user) {
            console.error('Incorrect username.');
            return callback(null, false, { message: 'incorrect username!' });
        }

        if (!user.validatePassword(password)) {
            console.error('Incorrect password!');
            return callback(null, false, { message: 'Incorrect password!' });
        }

        console.log('finished');
        return callback(null, user);
    });
}));

/** 
 * Defines a JWT strategy for authorizing users when doing API calls
 */
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            console.error(error);
            return callback(error);
        });
}));
