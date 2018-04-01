'use strict';
import path from 'path';

module.exports = function() {
    global.rootRequire = function(name) {
        return require(path.normalize(`${__dirname}/../${name}`));
    };
};