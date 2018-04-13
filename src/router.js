/*eslint no-undef: "off"*/
module.exports = [{
        path: '/',
        handler: rootRequire('src/routes/IndexRoute'),
    },
    {
        path: '/login',
        handler: rootRequire('src/routes/LoginRoute'),
    },
    {
        path: '/post',
        handler: rootRequire('src/routes/PostRoute'),
    },
    {
        path: '/user',
        handler: rootRequire('src/routes/UserRoute'),
    },
    {
        path: '/comment',
        handler: rootRequire('src/routes/CommentRoute'),    
    }
];