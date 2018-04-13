'use strict';

module.exports = {
    create: {
        post(req, res) {
            require('./createPost')(req, res);
        },
    },
    read: {
        get(req, res) {
            require('./readGet')(req, res);
        },
    },
    update: {
        put(req, res) {
            require('./updatePut')(req, res);
        },
    },
    delete: {
        delete(req, res) {
            require('./deleteDelete')(req, res);
        },
    },
    all: {
        get(req, res) {
            require('./allGet')(req, res);
        },
    },
};