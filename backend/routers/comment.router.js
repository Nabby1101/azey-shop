'use strict'
const comment_controller = require('../controllers/comment.controller');
module.exports = (app) => {
    app.route('/comment')
        .post(comment_controller.mycomment);
    app.route('/comment/costume')
        .post(comment_controller.getCommentByIDCostume)
}