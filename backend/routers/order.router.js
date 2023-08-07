const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/send-email', orderController.sendEmail);
router.post('/filter', orderController.show);
router.post('/', orderController.store);
router.put('/:id/pay', orderController.update);
router.put('/:id/delivered', orderController.delivered);
router.patch('/restore', orderController.restore);
router.patch('/:id/status', orderController.status);
router.delete('/force', orderController.forceDestroy);
router.delete('/', orderController.destroy);
router.get('/trash', orderController.trash);
router.get('/:id/mine', orderController.showByMine);
router.get('/:id', orderController.showById);

module.exports = router;
