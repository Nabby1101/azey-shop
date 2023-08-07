'use strict'
var cloudinary = require('cloudinary').v2;
var uploads = {};
cloudinary.config({
    cloud_name: 'azeyyyl',
    api_key: '816493268979741',
    api_secret: 'CjOoS-6f6suzqinVe6bfQhhmjA4'
});

const costume = require('../models/costume.model');
const user = require('../models/user.model');
const category = require('../models/category.model');
const seller = require('../models/seller.model');
const designer = require('../models/designer.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const uploadImg = async (path) => {
    let res
    try {
        res = await cloudinary.uploader.upload(path)
    }
    catch(err) {
        console.log(err)
        return false
    }
    return res.secure_url
}
exports.addCostume = async (req, res) => {
    if(typeof req.file === 'undefined' 
    || typeof req.body.name === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.release_date === 'undefined' 
    || typeof req.body.describe === 'undefined' 
    || typeof req.body.id_designer === 'undefined' 
    || typeof req.body.id_seller === 'undefined' 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    const {id_category, name, price, release_date, describe, id_designer, id_seller} = req.body;
    let urlImg = await uploadImg(req.file.path)
    if(urlImg === false) {
        res.status(500).json({msg: 'server error'});
        return;
    }
    const newCostume = new costume({
        id_category:id_category,
        name: name,
        price: price,
        release_date: release_date,
        img: urlImg,
        describe: describe,
        id_designer: id_designer,
        id_seller: id_seller
    })
    try{
        newCostume.save()
    }
    catch(err) {
        res.status(500).json({msg: 'server error'});
        return;
    }
    fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    res.status(201).json({msg: 'success'})
    
}
exports.updateCostume = async (req, res) => {
    if( typeof req.body.name === 'undefined' 
    || typeof req.body.id === 'undefined' 
    || typeof req.body.id_category === 'undefined' 
    || typeof req.body.price === 'undefined' 
    || typeof req.body.release_date === 'undefined' 
    || typeof req.body.describe === 'undefined' 
 
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name, id, id_category, price, release_date, describe, category} = req.body;
    let costumeFind;
    try {
        costumeFind = await costume.findById(id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (costumeFind === null) {
        res.status(404).json({ msg: "Not found" })
        return;
    }
    let urlImg = null;
    if(typeof req.file !== 'undefined' ) {
        urlImg = await uploadImg(req.file.path)
    }
    if(urlImg !== null) {
        if(urlImg === false) {
            res.status(500).json({msg: 'server error'});
            return;
        }
    }
    if(urlImg === null)
        urlImg = costumeFind.img;
    
    costumeFind.id_category = id_category;
    costumeFind.name = name;
    costumeFind.price = parseFloat(price)
    costumeFind.release_date = release_date;
    costumeFind.describe = describe;
    costumeFind.category = category;
    costumeFind.img = urlImg;
    costumeFind.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
   
    res.status(200).json({ msg: 'success', data: costumeFind });
}

exports.deletecostume = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let costumeFind;
    try {
        costumeFind = await costume.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    costumeFind.remove();
    res.status(200).json({ msg: 'success', });
}

exports.updateUser = async (req, res) => {
    if (typeof req.body.email === 'undefined'
        || typeof req.body.firstName === 'undefined'
        || typeof req.body.lastName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.is_admin === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, firstName, lastName, address, phone_number, is_admin } = req.body;
    let userFind;
    try {
        userFind = await user.findOne({ 'email': email })
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (userFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    userFind.firstName = firstName;
    userFind.lastName = lastName;
    userFind.address = address;
    userFind.phone_number = phone_number;
    userFind.is_admin = is_admin;
    try {
        await userFind.save()
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({
        msg: 'success', user: {
            email: userFind.email,
            firstName: userFind.firstName,
            lastName: userFind.lastName,
            address: userFind.address,
            phone_number: userFind.phone_number,
            is_admin: userFind.is_admin
        }
    });
}

exports.addDesigner = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let designerFind;
    try {
        designerFind = await designer.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (designerFind.length > 0) {
        res.status(409).json({ msg: 'Designer already exist' });
        return;
    }
    const newDesigner = new designer({ name: name });
    try {
        await newDesigner.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateDesignerr = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let designerFind;
    try {
        designerFind = await designer.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (designerFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    designerFind.name = name;
    try {
        await designerFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
  res.status(201).json({ msg: 'success', designer: { name: name } });
}

exports.deleteUser = async (req, res) => {
    if (typeof req.body.email === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind;
    try {
        userFind = await user.findOne({'email': req.body.email})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    userFind.remove();
    res.status(200).json({ msg: 'success'});
}

exports.addCategory = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind.length > 0) {
        res.status(409).json({ msg: 'Category already exist' });
        return;
    }
    const newCategory = new category({ name: name });
    try {
        await newCategory.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateCategory = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    categoryFind.name = name;
    try {
        await categoryFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', category: { name: name } });
}

exports.addSeller = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let sellerFind;
    try {
        sellerFind = await seller.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (sellerFind.length > 0) {
        res.status(409).json({ msg: 'Seller already exist' });
        return;
    }
    const newSeller = new seller({ name: name });
    try {
        await newSeller.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateSeller = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let sellerFind;
    try {
        sellerFind = await seller.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (sellerFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    sellerFind.name = name;
    try {
        await sellerFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', seller: { name: name } });
}
exports.addUser = async (req, res) => {
    if ((typeof req.body.email === 'undefined')
        || (typeof req.body.password === 'undefined')
        || typeof req.body.firstName === 'undefined'
        || typeof req.body.lastName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.is_admin === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, password, firstName, lastName, address, phone_number, is_admin } = req.body;
    let userFind = null;
    try {
        userFind = await user.find({ 'email': email });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        console.log(1)
        return;
    }
    if (userFind.length > 0) {
        res.status(409).json({ msg: 'Email already exist' });
        return;
    }
    password = bcrypt.hashSync(password, 10);
    const newUser = new user({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address,
        phone_number: phone_number,
        is_verify: true,
        is_admin: is_admin
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}
exports.getAllUser = async(req, res) => {
    if(typeof req.params.page === 'undefined') {
        res.status(402).json({msg: 'Data invalid'});
        return;
    }
    let count = null;
    try { 
        count = await user.count({});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({msg: err});
        return;
    }
    let totalPage = parseInt(((count - 1) / 9) + 1);
    let { page } = req.params;
    if ((parseInt(page) < 1) || (parseInt(page) > totalPage)) {
        res.status(200).json({ data: [], msg: 'Invalid page', totalPage });
        return;
    }
    user.find({})
    .skip(9 * (parseInt(page) - 1))
    .limit(9)
    .exec((err, docs) => {
        if(err) {
            console.log(err);
                    res.status(500).json({ msg: err });
                    return;
        }
        res.status(200).json({ data: docs, totalPage });
    })
}
exports.login = async (req, res) => {
    if(typeof req.body.email === 'undefined'
    || typeof req.body.password == 'undefined'){
        res.status(402).json({msg: "Invalid data"});
        return;
    }
    let { email, password } = req.body;
    let userFind = null;
    try{
        userFind = await user.findOne({'email': email, 'is_admin': true});
    }
    catch(err){
        res.json({msg: err});
        return;
    }
    if(userFind == null){
        res.status(422).json({msg: "Invalid data"});
        return;
    }

    if(!userFind.is_verify){
        res.status(401).json({msg: 'no_registration_confirmation'});
        return;
    }
    
    if(!bcrypt.compareSync(password, userFind.password)){
        res.status(422).json({msg: 'Invalid data'});
        return;
    }
    let token = jwt.sign({email: email,  iat: Math.floor(Date.now() / 1000) - 60 * 30}, 'shhhhh');
    res.status(200).json({msg: 'success', token: token, user: {
        email: userFind.email,
        firstName: userFind.firstName,
        lastName: userFind.lastName,
        address: userFind.address,
        phone_number: userFind.phone_number,
        id: userFind._id
    }});
}