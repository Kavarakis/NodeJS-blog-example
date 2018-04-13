const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    let response = {};

    var specs = {};
    specs.include = [{
        model: models.Comment,
        owner: 'comment'
    }];
    specs.where = null;
    if (!req.query.page && !req.query.limit) {
        //default
        req.query.limit = 10;
        req.query.page = 1;
    }
    const pagination = require('../../scripts/paginationHandling')(req, specs.Include, specs.where, models.Post);

    if (pagination.promise) {

        pagination.promise.finally(() => {

            if (pagination.err) res.status(400).json(errorHandling(pagination.err));
            else {

                pagination.getAll.then((post) => {

                    response.data = {};
                    response.pagination = {};

                    if (post) {
                        response.data.message = 'Successful retrieval';
                        response.data.posts = post;
                        response.pagination.pages = pagination.pages;
                        response.pagination.count = pagination.count;
                        res.status(200).json(response);
                    } else {
                        response.data.message = 'Not Found';
                        response.data.posts = null;
                        response.pagination.pages = 0;
                        response.pagination.count = 0;

                        res.status(404).json(response);
                    }
                }).catch((err) => {
                    res.status(400).json(errorHandling(err));
                });
            }
        });
    } else {

        //If pagination doesn't have default values 
        //User gets all records in different format

        pagination.getAll.then((post) => {

            if (post) {
                response.message = 'Successful retrieval';
                response.posts = post;
                res.status(200).json(response);
            } else {
                response.message = 'Not Found';
                response.posts = null;
                res.status(404).json(response);
            }
        }).catch((err) => {
            res.status(400).json(errorHandling(err));
        });
    }

};