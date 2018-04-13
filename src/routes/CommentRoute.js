'use strict';

/*******************
 * Comment Route
 * path: /comment
 ******************** */

let express = require('express');
let Controller = require('../controllers/Comment/CommentController');
let router = express.Router();

router.post('/', Controller.create.post);
router.get('/', Controller.all.get);
router.get('/:id', Controller.read.get);
router.put('/:id', Controller.update.put);
router.delete('/:id', Controller.delete.delete);

module.exports = router;