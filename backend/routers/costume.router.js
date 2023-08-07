'use strict'
const costume_controller = require('../controllers/costume.controller');
module.exports = (app) => {
    app.route('/costume/totalpage')
        .get(costume_controller.getTotalPage);

    app.route('/costume/allcostume')
        .post(costume_controller.getAllCostume);

    app.route('/costume/designer')
        .post(costume_controller.getCostumeByDesigner);

    app.route('/costume/category')
        .post(costume_controller.getCostumeByCategory);

    app.route('/costume/seller')
        .post(costume_controller.getCostumeBySeller);

    app.route('/costume/:id')
        .get(costume_controller.getCostumeByID)

    app.route('/costume/related/:costumeId')
        .get(costume_controller.getRelatedCostume)
}