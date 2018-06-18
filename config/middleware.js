const Port = 5000;
process.env.PORT = Port;
let bodyParser = require('body-parser');
let passport = (require('./passport')).passport;
const cors = require('cors');
const path = require('path');
const constants = require('../utils/constants').PATHS;
module.exports = function (app, express) {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(bodyParser.json());
    app.use(cors());
    app.options('*', cors());
    app.use(passport.initialize());
    app.use(express.static(
        path.join(constants.root + '/public')
    ));

};