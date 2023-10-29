const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASSWORD
    }
});
//create the email template
module.exports.sendConfirmationEmail = async (name, email, confirmationCode) => {
    transporter.sendMail({
        from: process.env.MAIN_MAIL,	
        to: email,
        subject: 'Account Activation',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering with us. Please click on the link below to activate your account</p>
        <a href=${process.env.VERIFY_EMAIL_URL}/confirm/${confirmationCode}>Click here</a>
        </div>`
    }).catch(err => console.log(err))
}
module.exports.sendConfirmationEmailClient = async (email, confirmationCode) => {
    transporter.sendMail({
        from: process.env.MAIN_MAIL,	
        to: email,
        subject: 'Account Activation',
        html: `<h1>Email Confirmation</h1>
        <h2>Greetings from alex-quiz-game</h2>
        <p>Thank you for registering with us. Please enter the code below to activate your account</p>
        <h3>${confirmationCode}</h3>
        </div>`
    }).catch(err => console.log(err))
}
module.exports.sendPasswordResetEmail = async (email,code) => {
    transporter.sendMail({
        from: process.env.MAIN_MAIL,
        to: email,
        subject: 'Password Reset',
        html: `<h1>Password Reset</h1>
        <h2>Hello</h2>
        <p>Enter the code below to reset your password</p>
        <h3>${code}</h3>
        </div>`
    }).catch(err => console.log(err))
}
