const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');
const Op = (require('../../../models/index').Sequelize).Op;
const auth = require('../../scripts/auth');

module.exports = (req, res) => {

    auth(
        ['user'], req, res, (err, check) => {

            let response = {};

            if (err) res.json(errorHandling(err));
            else if (check) {

                var specs = {};
                specs.include = [{
                    model: models.Post,
                    owner: 'post'
                }];
                specs.where = {
                    id: {
                        [Op.ne]: check.get('id')
                    }
                };

                models.User.findAll(specs).then((user) => {

                    if (user) {
                        response.message = 'Successful retrieval';
                        response.user = user;
                        res.status(200).json(response);
                    } else {
                        response.message = 'Not Found';
                        response.user = null;
                        res.status(404).json(response);
                    }
                }).catch((err) => {
                    res.status(400).json(errorHandling(err));
                });
            } else if (!check) {
                response.message = 'Invalid token';
                res.status(406).json(response);
            }
        });
};