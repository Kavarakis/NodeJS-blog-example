var bodyParser = require('body-parser');
var helmet = require('helmet');
module.exports = function (app) {
    app.use(helmet());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());

};