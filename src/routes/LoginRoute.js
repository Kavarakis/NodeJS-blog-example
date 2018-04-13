'use strict';

/*******************
 * Login Route
 * path: /login
 ******************** */

let express    = require('express');
let Controller = require('../controllers/LoginController');
let router     = express.Router();

router.post('/', Controller.index.post);

module.exports = router;