let cfg = require('./passportConfig');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let passportJWT = require("passport-jwt");
let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let models = require('../models');
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Authorization');
jwtOptions.secretOrKey = cfg.jwtSecret;

let UserStrategy = new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    //console.log('payload received:', jwt_payload);
    models.User.findOne({
        where: {
            email: jwt_payload.email
        }
    }).then((user) => {

        if (user) {
            return done(null, user, {
                message: 'Valid User.'
            });
        } else {

            return done(null, false, {
                message: 'User not found.'
            });
        }
    }).catch((err) => {
        if (err) {
            return done(null, false, {
                message: 'User not found.'
            });
        }
    });
});

passport.use('user', UserStrategy);

module.exports = {
    passportJWT: passportJWT,
    passport: passport,
    jwt: jwt
};