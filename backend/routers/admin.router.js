'use strict'
const admin_controller = require('../controllers/admin.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: './files',
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
    const upload = multer({ storage });
module.exports = (app) => {
    //costume
    app.route('/admin/addcostume')
        .post(upload.single('file'), admin_controller.addCostume);
    app.route('/admin/updatecostume')
        .post(upload.single('file'), admin_controller.updateCostume);
    app.route('/admin/deletecostume/:id')
        .get(admin_controller.deletecostume);
    //user
    app.route('/admin/updateuser')
        .post(admin_controller.updateUser);
    app.route('/admin/deleteuser')
        .post(admin_controller.deleteUser);
    app.route('/admin/adduser')
        .post(admin_controller.addUser);
     app.route('/admin/getAllUser/:page')
        .get(admin_controller.getAllUser);
     app.route('/admin/login')
        .post(admin_controller.login);
    //category
    app.route('/admin/addcategory')
        .post(admin_controller.addCategory);
    app.route('/admin/updatecategory')
        .post(admin_controller.updateCategory);
    //seller
    app.route('/admin/addseller')
        .post(admin_controller.addSeller);
    app.route('/admin/updateseller')
        .post(admin_controller.updateSeller);
    //designer
    app.route('/admin/adddesigner')
       .post(admin_controller.addDesigner);
    app.route('/admin/updatedesigner')
       .post(admin_controller.updateDesignerr);
}