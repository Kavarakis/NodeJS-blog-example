const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    let reqId = req.params.id;
    var response = {};

    models.Comment.findOne({
        where: {
            id: reqId
        },
        include: [{
            model: models.Post,
            as: 'post'
        },{
            model: models.User,
            as: 'user'     
        }]
    }).then((comment) => {

        if (comment) {
            response.message = 'Comment retrieved successfully.';
            response.comment = comment;
            res.status(200).json(response);
        } else {
            response.message = 'Comment not found.';
            response.comment = null;
            res.status(404).json(response);
        }
    }).catch((err) => {
        res.status(400).json(errorHandling(err));
    });
};