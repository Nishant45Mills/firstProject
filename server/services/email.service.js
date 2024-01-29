const nodemailer = require('nodemailer');

const sendMail = async (to, html, subject) => {

    const transporter = nodemailer.createTransport({

		service: "gmail",
        auth: {

            user: 'nishantjarang74@gmail.com',
            pass: 'fhzfkhrpjggashbc'
        }
    })

    const options = {

        from: '<admin@gmail.com>',
        to: to,
        subject: subject,
        html: html

    }

    return transporter.sendMail(options);

}

module.exports = { sendMail };