'use strict'
const designer_controller = require('../controllers/designer.controller');
module.exports = (app) => {
    app.route("/designer/all/:page")
        .get(designer_controller.getAll);
    app.route("/designer")
        .get(designer_controller.getDesigner);
    app.route("/designer/name/:id")
        .get(designer_controller.getNameByID);

}
