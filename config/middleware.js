var Port = 5000;
process.env.PORT = Port;
var bodyParser = require('body-parser');
var passport = (require('./passport')).passport;
const cors = require('cors');

module.exports = function (app) {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use(cors());
    app.options('*', cors());
    app.use(passport.initialize());
};