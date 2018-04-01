let express = require('express');
let rootRequireDef = require('./utils/rootRequire');
rootRequireDef();
let Router = rootRequire('src/router');
let app = express();
/****ESLint Config****/
/*eslint no-undef: "off"*/
/*eslint-env node*/
require('./config/middleware')(app, express);
Router.forEach(route => {
    app.use(route.path, route.handler);
});

app.listen(3000, function () {
    //eslint-disable-next-line no-console
    console.log("Listening on port 3000");
});