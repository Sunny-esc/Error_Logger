import nodemailer from 'nodemailer';

const transponder=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL ,
        pass:process.env.PASS,
    }
});
/**
 * Send an email using the transporter.
 * @param {Object} mailOptions - { to, subject, text, html }
 * @returns {Promise}
 */
export function sendMail(mailOptions) {
    if (!mailOptions.to) {
        return Promise.reject(new Error("No recipients defined in 'to' field."));
    }
    return transponder.sendMail(mailOptions);
}

export default transponder;