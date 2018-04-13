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

            models.Post.create({
                title: req.body.title,
                description: req.body.description,
                body: req.body.body,
                userId: check.get('id')
            }).then((post) => {

                if (post) {
                    response.message = 'Post created successfully';
                    response.post = post;
                    res.status(201).json(response);
                } else {
                    response.message = 'Post is not created';
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