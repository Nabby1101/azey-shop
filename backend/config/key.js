require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            process.env.DATABASE_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true
            }
        );

        console.log('connect successfully !!!');
    } catch (error) {
        console.log('connect failure !!!');
    }
}

module.exports = { connect };