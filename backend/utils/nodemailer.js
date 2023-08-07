const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
   {
    service: 'gmail',
    auth: {
      user: 'sogeking2k2@gmail.com',
      pass: 'yurisa0204'
    }
   }
)

exports.sendEmail = async (email, token) => {
    let mailOptions = {
        from: '"Azeyyyl Shop 👻" <sogeking2k2@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Account Verification Token', // Subject line
        text: 'Hello, give u some information from my shop!',
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>Please verify your account by clicking the link</span>'
            + '<br/>'
            + '<span>https://app-text-frontend.vercel.app/confirm/' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}

exports.sendEmailForgotPassword = async (email, token) => {
    let mailOptions = {
        from: '"Azeyyyl Shop 👻" <sogeking2k2@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Forgot password Verification Token', // Subject line
        html: '<b>Forgot password</b>'
            + ' <br/>'
            + '<span>Please enter OTP below</span>'
            + '<br/>'
            + '<span>' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}
exports.sendMailConfirmPayment = async (email, token) => {
    let mailOptions = {
        from: '"Azeyyyl Shop 👻" <sogeking2k2@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Payment Verification Token', // Subject line
        text: 'From Azeyyyl Shop with love <3',
        html: '<b>verify your account</b>'
            + ' <br/>'
            + '<span>Please verify your payment by clicking the link</span>'
            + '<br/>'
            + '<span>https://app-text-frontend.vercel.app/payment/' + token +  '</span>'
    };
    try{
        let send = await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log(err);
        return false;
    }
    return true;
}