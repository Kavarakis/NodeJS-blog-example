const models = require('../../../models');
const auth = require('../../scripts/auth');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    auth([
        'user'
    ], req, res, (err, check) => {

        let reqId = req.params.id;
        var response = {};

        if (err) res.status(400).json(errorHandling(err));

        else if (check) {
            models.User.findOne({
                where: {
                    id: reqId
                },
                include: {
                    model: models.Post,
                    owner: 'post'
                },
            }).then((user) => {

                if (user) {
                    response.message = 'User retrieved successfully.';
                    response.user = user;
                    res.status(200).json(response);
                } else {
                    response.message = 'User not found.';
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