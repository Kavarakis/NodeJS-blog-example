const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {


        let response = {};


            models.User.create({
                name: req.body.name,
                surname: req.body.surname,
                roleId: req.body.roleId,
                email: req.body.email,
                password: req.body.password
            }).then((user) => {

                if (user) {
                    response.message = 'User created successfully';
                    response.user = user;
                    res.status(201).json(response);
                } else {
                    response.message = 'User is not created';
                    response.user = null;                   
                    res.status(400).json(response);
                }
            }).catch((err) => {
                res.status(400).json(errorHandling(err));
            });
};