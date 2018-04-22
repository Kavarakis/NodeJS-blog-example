const models = require('../../../models');
const auth = require('../../scripts/auth');
const errorHandling = require('../../scripts/errorHandling');
const sequelize = require('../../../models/index').sequelize;

module.exports = (req, res) => {

    auth([
        'user'
    ], req, res, (err, check) => {

        let response = {};

        if (err) res.status(400).json(errorHandling(err));

        else if (check) {
          
                let reqId = req.params.id;
                if (reqId == check.get('id')) {
                    
                var providedUser = req.body;

                sequelize.transaction((t) => {

                    return models.User.findOne({
                        where: {
                            id: reqId
                        }
                    }, {
                        transaction: t
                    }).then((user) => {

                        if (user) {
                            var obj = {
                                name: providedUser.name,
                                surname: providedUser.surname,
                                roleId: providedUser.roleId,
                                email: providedUser.email,
                                password: providedUser.password
                            };
                            if (providedUser.password == user.get('password')) {
                                delete obj.password;
                            }
                            return user.update(
                                obj, {
                                    transaction: t
                                }).then((updatedUser) => {

                                if (updatedUser) {
                                    //If request is empty and User isn't updated
                                    if (JSON.stringify(providedUser) === '{}')
                                        response.message = 'User is not updated.';

                                    else {
                                        response.message = 'User successfully updated.';
                                        response.User = updatedUser;
                                    }
                                    res.status(200).json(response);
                                } else {
                                    response.message = 'User is not updated.';
                                    res.status(400).json(response);
                                }
                            }).catch((err) => {
                                res.status(400).json(errorHandling(err));
                            });
                        } else {
                            response.message = 'User is not updated.';
                            res.status(400).json(response);
                        }
                    }).catch((err) => {
                        res.status(400).json(errorHandling(err));
                    });
                }).catch((err) => {
                    res.status(400).json(errorHandling(err));
                });
            } else {
                response.message = 'Unauthorized request';
                res.status(401).json(response);
            }
        } else if (!check) {
            response.message = 'Invalid token';
            res.status(406).json(response);
        }
    });
};