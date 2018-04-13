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
            var obj = {
                title: req.body.title,
                description: req.body.description,
                body : req.body.body
            };

            models.Post.update(obj, {
                    where: {
                        id: reqId
                    }
                }).then((post) => {

                    if (post) {
                        //If request is empty and User isn't updated
                        if (JSON.stringify(req.body) === '{}')
                            response.message = 'User is not updated.';

                        else {
                            response.message = 'Post successfully updated.';
                            response.Post = post;
                        }
                        res.status(200).json(response);
                    } else {
                        response.message = 'Post is not updated.';
                        res.status(400).json(response);
                    }
                })
                .catch((err) => {
                    res.status(400).json(errorHandling(err));
                });
        } else if (!check) {
            response.message = 'Invalid token';
            res.status(406).json(response);
        }
    });
};