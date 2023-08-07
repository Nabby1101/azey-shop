'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const seller = new Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
    },
});
module.exports = mongoose.model('seller', seller);