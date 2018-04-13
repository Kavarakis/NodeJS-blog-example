const passport = (require('../../config/passport')).passport;

module.exports = (strategy, req, res, cb) => {

    passport.authenticate(strategy, {
        session: false
    }, cb)(req, res);
};