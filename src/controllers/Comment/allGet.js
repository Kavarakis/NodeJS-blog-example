const models = require('../../../models');
const errorHandling = require('../../scripts/errorHandling');

module.exports = (req, res) => {

    let response = {};

    var specs = {};
    specs.include = [{
        model: models.Post,
        as: 'data'
    }, {
        model: models.User,
        as: 'user'

    }];
    specs.where = null;
    if (!req.query.page && !req.query.limit) {
        //default
        req.query.limit = 20;
        req.query.page = 1;
    }
    const pagination = require('../../scripts/paginationHandling')(req, specs.Include, specs.where, models.Comment);

    if (pagination.promise) {

        pagination.promise.finally(() => {

            if (pagination.err) {
                res.status(400).json(errorHandling(pagination.err));
            } else {
                pagination.getAll.then((data) => {

                    response.data = {};
                    response.pagination = {};

                    if (data) {
                        response.data.message = 'Successful retrieval';
                        response.data.comments = data;
                        response.pagination.pages = pagination.pages;
                        response.pagination.count = pagination.count;
                        res.status(200).json(response);
                    } else {
                        response.data.message = 'Not Found';
                        response.data.comments = null;
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

        pagination.getAll.then((comment) => {

            if (comment) {
                response.message = 'Successful retrieval';
                response.comments = comment;
                res.status(200).json(response);
            } else {
                response.message = 'Not Found';
                response.comments = null;
                res.status(404).json(response);
            }
        }).catch((err) => {
            res.status(400).json(errorHandling(err));
        });
    }

};