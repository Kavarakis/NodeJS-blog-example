const constants = require('../../utils/constants').PATHS;
module.exports = function (app, Router) {
    Router.forEach(route => {
       if (route.path !== '/') {
            app.use('/api' + route.path, route.handler);
       }
    });
    app.get('*', function (req, res) {
        res.sendFile(constants.root + '/client/index.html');
    });
    app.use("/*", function (req, res) {
        res.status(404).send('Non-existing route');
    });
};