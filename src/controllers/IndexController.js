'use strict';
const constants = require('../../utils/constants').PATHS;
module.exports = {
    index: {
        get(req, res) {

            res.sendFile(constants.root + '/client/index.html');
        },
    },
};