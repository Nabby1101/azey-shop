'use strict'
const seller_controller = require('../controllers/seller.controller');
module.exports = (app) => {
    app.route('/seller')
        .get(seller_controller.getSeller);
    app.route('/seller/all/:page')
        .get(seller_controller.getAll);
    app.route('/seller/name/:id')
        .get(seller_controller.getNameByID)
}