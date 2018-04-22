'use strict';
const path = require('path');

module.exports = function () {
    global.rootRequire = function (name) {
        return require(path.normalize(`${__dirname}/../${name}`));
    };
};