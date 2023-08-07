const userModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var fs = require('fs');
const uploadFile = require('../utils/multerUser');
class UserController {
    uploadImg = uploadFile.single('image');

    //UploadImage
    uploadSingleImg = async (req, res, next) => {
        try {
            res.send('File Uploaded Successfully');
        } catch (error) {
            res.send(error.message);
        }
    };

    // [POST] /login
    login = async (req, res, next) => {
        console.log(req.body);
        try {
            const user = await userModel.findOne({ email: req.body.email });
            console.log(user)
            if (user) {
                if (bcryptjs.compareSync(req.body.password, user.password)) {
                    var token = '';
                    if (user.role === 0) {
                        token = jwt.sign(
                            { _id: user._id },
                            process.env.SECRET,
                            {
                                expiresIn: "1h",
                            }
                        );
                    }
                    res.send({
                        info: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                            sex: user.sex,
                            dateOfBirth: user.dateOfBirth,
                            role: user.role,
                            address: user.address,
                            avatar: user.avatar,
                            token: token,
                        },
                        message: {
                            message: 'Đăng nhập thành công !',
                        },
                    });
                    return;
                }
                res.send({ message: 'Email hoặc mật khẩu không chính xác !' });
            } else {
                res.send({ message: 'User không tồn tại !' });
            }
        } catch (next) {
            res.send({ error: 'Error' });
        }
    };

    // [POST] /register

    register = async (req, res, err) => {
        const user = await userModel.find({ email: req.body.email });

        console.log(user);

        if (user.length > 0) {
            res.send({ message: 'Email hoặc số điện thoại đã tồn tại' });
        } else {
            const newUser = new userModel({
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 8),
            });
            await newUser
                .save()
                .then(() =>
                    res.send({
                        info: {
                            _id: newUser._id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email,
                            phone: newUser.phone,
                            role: newUser.role,
                            sex: newUser.sex,
                            dateOfBirth: newUser.dateOfBirth,
                            address: newUser.address,
                        },
                        message: {
                            message: 'Đăng ký thành công !',
                        },
                    })
                )
                .catch((err) => res.status(500).json({ error: err.message }));
        }
    };

    //[POST] /forgetPassword
    forgetPassword = async (req, res, err) => {
        const user = await userModel.findOne({ email: req.body.email });
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ACCOUNT_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });
        var content = '';
        content += `
            <div>
                <p>Chào </p>
                <p>Có một yêu cầu thay đổi mật khẩu từ bạn.</p>
                <p>Nếu không phải bạn thực hiện yêu cầu thì bỏ qua tin nhắn này.</p>
                <p>Bạn hãy nhấn vào <a href="https://app-text-frontend.vercel.app/change-password/${user._id}"><b>Link này</b></a>
                 để thay đổi mật khẩu.</p>
                <p><i>(Thời hạn của đường dẫn trên là 72 giờ.)</i></p>`;

        var mainOptions = {
            from: 'azeyshop@gmail.com',
            to: req.body.email,
            subject: 'AzeyShop 👻👻👻" <azeyshop@gmail.com>',
            html: content,
        };
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                res.json({ err, message: 'Lỗi' });
            } else {
                res.json(user);
            }
        });
    };

    //[PUT] /changePassword
    changePassword = async (req, res, err) => {
        const user = await userModel.findOne({ _id: req.body.id });
        if (user) {
            user.password = bcryptjs.hashSync(req.body.password, 8);
        }
        userModel
            .findOneAndUpdate({ _id: req.body.id }, user, {
                returnOriginal: false,
            })
            .then((User) =>
                res.send({
                    message: 'Change Password Successfully',
                    user: User,
                })
            )
            .catch(() => res.send({ message: 'User Not Found !!!' }));
    };

    // [GET] /
    show(req, res, next) {
        Promise.all([userModel.find({}), userModel.countDocumentsDeleted()])
            .then(([Users, deletedCount]) =>
                res.json({
                    deletedCount,
                    Users,
                })
            )
            .catch(next);
    }

    //[GET] /login-google/callback || /login-facebook/callback
    redirectToken(req, res) {
        res.redirect('https://app-text-frontend.vercel.app');
    }

    //[GET] /login-google/success || /login-facebook/success
    successLogin(req, res, next) {
        res.send(req.user);
    }

    //[GET] /login-google/failed
    loginGoogleFailed(req, res, next) {
        res.status(401).send({
            message: 'Đăng nhập tài khoản Google không thành công. ',
        });
    }

    // [GET] /trash
    trash(req, res, next) {
        userModel
            .findDeleted({})
            .then((Users) => res.json(Users))
            .catch(next);
    }

    // [POST] /:id
    getRole(req, res, next) {
        userModel
            .findById(req.body.id)
            .then((User) => res.json(User.role))
            .catch(next);
    }

    // [GET] /:id/edit
    edit(req, res, next) {
        userModel
            .findById(req.params.id)
            .then((User) => res.send(User))
            .catch(next);
    }

    // [PUT] /:id
    update(req, res, next) {
        userModel
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => res.send({ message: 'Update Successfully !!!' }))
            .catch(next);
    }

    // [PUT] /:id/info
    updateInfo = async (req, res, next) => {
        const info = JSON.parse(req.body.infos);
        if (req.file) {
            const userImage = await userModel.findOne({ _id: req.params.id });
            const currPath = './uploads/users/' + userImage.avatar;
            if (fs.existsSync(currPath)) {
                fs.unlinkSync(currPath);
            }
            info.avatar = req.file.path.slice(14);
        }
        userModel
            .updateOne({ _id: req.params.id }, info)
            .then(() =>
                res.send({ message: 'Update Successfully !!!', data: info })
            )
            .catch(next);
    };

    // [DELETE] /:id
    destroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        userModel
            .delete({ _id: idArr })
            .then(() => res.send('Delete Successfully !!!'))
            .catch(() => res.send({ message: 'Delete failed' }));
    }

    // [DELETE] /force
    forceDestroy(req, res, next) {
        const ids = req.body.id;
        const idArr = ids.split(',');
        userModel
            .deleteMany({ _id: idArr })
            .then(() => res.send('Delete Forever Successfully !!!'))
            .catch(() => res.send({ message: 'Delete Forever failed' }));
    }

    // [PATCH] /:id/restore
    restore(req, res, next) {
        try {
            const ids = req.body.data;
            ids.forEach((value) =>
                userModel.restore({ _id: value }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                })
            );
            res.send('Restore Successfully !!!');
        } catch (error) {
            res.send({ message: err });
        }
    }

    // [PATCH] /:id/favorites
    addFavorites = async (req, res, next) => {
        try {
            const user = await userModel.findOne({ _id: req.params.id });
            var check = false;
            if (user) {
                user.favorites.forEach((item, index) => {
                    if (item._id.toString() === req.body.idPro) {
                        user.favorites.splice(index, 1);
                        return (check = true);
                    }
                });
                if (check === false) {
                    user.favorites.push(req.body.idPro);
                }
            }
            userModel
                .findOneAndUpdate({ _id: user.id }, user, {
                    returnOriginal: false,
                })
                .then(() => res.send('Action Successfully !!!'))
                .catch(next);
        } catch (error) {
            res.send({ error: error });
        }
    };

    // [POST] /handle-form-actions
    // handleFormAction(req, res, next) {
    //     switch (req.body.action) {
    //         case 'delete':
    //             userModel.delete({ _id: { $in: req.body.UserIds } })
    //                 // .then(() => res.redirect('back'))
    //                 .then(() => res.send('Đã xóa các sản phẩm đã chọn !!!'))
    //                 .catch(next);
    //             break;

    //         default:
    //             res.json({ message: 'Action in invalid' })
    //     }
    // }
}

module.exports = new UserController();
