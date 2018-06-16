const express = require('express');
const rootRequireDef = require('./utils/rootRequire');
const chalk = require('chalk');
rootRequireDef(); //initializing function
let Router = rootRequire('src/router');
let app = express();
/****ESLint Config****/
/*eslint no-undef: "off"*/
/*eslint-env node*/
require('./config/middleware')(app, express);
require('./src/scripts/routeHandling')(app, Router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    //eslint-disable-next-line no-console
    console.log(chalk.bgBlue.whiteBright.bold("Listening on port: " + PORT + " "));
});
module.exports = app;