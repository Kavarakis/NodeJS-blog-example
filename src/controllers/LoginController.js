'use strict';
const models = require('../../models');
const passport = require('../../config/passport');
const cfg = require('../../config/passportConfig');
const errorHandling = require('../scripts/errorHandling');

module.exports = {
    index: {
        post(req, res) {

            let email = req.body.email;
            let password = req.body.password;


            models.User.findOne({
                where: {
                    email: email
                },
            }).then((user) => {

                let response = {};
                let token;
                response.message = {};

                if (user && password) {

                    models.User.comparePasswords(password, user.password, (err, check) => {

                        if (check) {
                            let tokenUser = user.get({
                                plain: true
                            });
                            delete tokenUser.password;

                            token = passport.jwt.sign(tokenUser, cfg.jwtSecret, {
                                expiresIn: '6h'
                            });

                            response.User = user.toJSON();
                            response.token = token;
                            response.message.password = true;
                            response.message.email = true;
                            response.message.msg = 'User is successfully logged in.';
                            res.status(200).json(response);
                        } else {
                            response.User = null;
                            response.message.msg = 'Bad password';
                            response.message.password = false;
                            response.message.email = true;
                            res.status(400).json(response);
                        }
                    });
                } else if (!user && password) {

                    response.User = null;
                    response.message.msg = 'Bad email.';
                    response.message.email = false;
                    response.message.password = true;
                    res.status(400).json(response);
                } else if (user && !password) {

                    response.User = null;
                    response.message.msg = 'Bad password.';
                    response.message.email = true;
                    response.message.password = false;
                    res.status(400).json(response);
                } else {

                    response.User = null;
                    response.message.msg = 'Bad request.';
                    response.message.email = false;
                    response.message.password = false;
                    res.status(404).json(response);
                }
            }).catch((err) => {

                res.status(404).json(errorHandling(err));
            });
        },
    },
};
