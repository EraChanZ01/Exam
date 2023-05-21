const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'michaela99@ethereal.email',
            pass: 'g8GX7UrynZhgSuqp5k'
        }
    },
    {
        from: "Squadhelp <michaela99@ethereal.email>",
    }
);


module.exports.mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err)
        console.log('Email sent:', info)
    })
}
