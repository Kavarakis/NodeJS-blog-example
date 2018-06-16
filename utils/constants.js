'use strict';

import path from 'path';
module.exports = {
    PATHS: {
        route: `${path.dirname(require.main.filename)}/../src/routes`,
        controller: `${path.dirname(require.main.filename)}/../src/controllers`,
        model: `${path.dirname(require.main.filename)}/../src/models`,
        root: `${path.dirname(require.main.filename)}`
    },
};