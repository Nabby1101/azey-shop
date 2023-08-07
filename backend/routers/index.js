const catRouter = require('./category.router');
const sizeRouter = require('./size.router');
const colorRouter = require('./color.router');
const productRouter = require('./product.router');
const userRouter = require('./user.router');
const orderRouter = require('./order.router');
const configRouter = require('./config.router');
const topicRouter = require('./topic.router');
const postRouter = require('./post.router');
const imageRouter = require('./image.router');
const contactRouter = require('./contact.router');
const pageRouter = require('./page.router');
const voucherRouter = require('./voucher.router');
// const testRouter = require('./test');

function router(app) {
    app.use('/api/category', catRouter);
    app.use('/api/size', sizeRouter);
    app.use('/api/color', colorRouter);
    app.use('/api/product', productRouter);
    app.use('/api/user', userRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/config', configRouter);
    app.use('/api/topic', topicRouter);
    app.use('/api/post', postRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/contact', contactRouter);
    app.use('/api/page', pageRouter);
    app.use('/api/voucher', voucherRouter);
    // app.use('/api/test', testRouter);
}

module.exports = router;
