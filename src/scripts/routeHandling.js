module.exports = function (app, Router) {
    Router.forEach(route => {
        
        app.use(route.path, route.handler);
    });

    app.use("/*", function (req, res) {

        res.status(404).send('Non-existing route');
    });
};