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

            models.Comment.create({
                body: req.body.body,
                postId: req.body.postId,
                userId: check.get('id')
            }).then((comment) => {

                if (comment) {
                    response.message = 'Comment created successfully';
                    response.comment = comment;
                    res.status(201).json(response);
                } else {
                    response.message = 'Comment is not created';
                    res.status(400).json(response);
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