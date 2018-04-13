const models = require('../../../models');
const auth = require('../../scripts/auth');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    auth([
        'user'
    ], req, res, (err, check) => {

        let response = {};

        if (err) res.status(400).json(errorHandling(err));

        else if (check) {
            
            let reqId = req.params.id;
            if (reqId == check.get('id')) {

                models.User.destroy({
                    where: {
                        id: reqId
                    }
                }).then((affectedRows) => {

                    if (affectedRows) {
                        response.message = 'Deletion successful';
                        response.affectedRows = affectedRows;
                        res.status(200).json(response);
                    } else {
                        response.message = 'Deletion failed.';
                        response.affectedRows = affectedRows;
                        res.status(400).json(response);
                    }
                }).catch((err) => {
                    res.status(404).json(errorHandling(err));
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