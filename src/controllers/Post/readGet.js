const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    let reqId = req.params.id;
    var response = {};

    models.Post.findOne({
        where: {
            id: reqId
        },
        include: {
            model: models.Comment,
            owner: 'comment'
        },
    }).then((post) => {

        if (post) {
            response.message = 'Post retrieved successfully.';
            response.post = post;
            res.status(200).json(response);
        } else {
            response.message = 'Post not found.';
            response.post = null;
            res.status(404).json(response);
        }
    }).catch((err) => {
        res.status(400).json(errorHandling(err));
    });
};