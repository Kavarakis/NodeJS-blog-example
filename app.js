var express = require('express');
var rootRequireDef = require('./utils/rootRequire');
var chalk = require('chalk');
rootRequireDef(); //initializing function
let Router = rootRequire('src/router');
let app = express();
/****ESLint Config****/
/*eslint no-undef: "off"*/
/*eslint-env node*/
require('./config/middleware')(app);
require('./src/scripts/routeHandling')(app, Router);
const PORT = process.env.PORT || 3000;
// Router.forEach(route => {
//     app.use(route.path, route.handler);
// });
// app.use(function (err, req, res, next) {
//     console.log('ok');
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })
// app.use(function(req, res, next) {
//     console.error(err.stack)    
//     res.status(404).send('404 page');
// });
// app.use(function(req, res, next) {    
//     res.status(404).send('404 page');
//   next(console.error(new Error("Bad request.")));
// });

// app.use("/*", function(req,res){
// res.redirect('/');
// })
app.listen(PORT, function () {
    //eslint-disable-next-line no-console
    console.log(chalk.bgBlue.whiteBright.bold("Listening on port: " + PORT + " "));
});