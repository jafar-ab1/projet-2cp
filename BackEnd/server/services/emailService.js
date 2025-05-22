const nodemailer = require('nodemailer');
const config = require('../../config');

const transporter = nodemailer.createTransport({
    service: 'gmail', // on peut utiliser un autre service (Outlook, SMTP perso, etc.)
    auth: {
        user: config.email.user, // Adresse email de l'expéditeur
        pass: config.email.password  // Mot de passe ou App Password si Gmail
    }
});

async function sendVerificationEmail(email, code) {
    const mailOptions = {
        from: 'hotel <nepasrepondre325@gmail.com>', // Expéditeur
        to: email,
        subject: "✨ Confirm Your Email - UpTalent",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <h2 style="color: #0056b3; text-align: center;">Welcome to UpTalent!</h2>
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 16px;">Thank you for signing up! To complete your registration, please verify your email address using the code below:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 28px; font-weight: bold; background: #0056b3; color: #ffffff; padding: 10px 20px; border-radius: 5px; display: inline-block;">${code}</span>
                </div>
                <p style="font-size: 16px;">This code is valid for <strong>10 minutes</strong>. If you did not request this, please ignore this email.</p>
                <p style="font-size: 16px; text-align: center;">Need help? Contact our support team.</p>
                <br>
                <p style="font-size: 14px; text-align: center; color: #888;">© 2025 UpTalent. All rights reserved.</p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to:", email);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

module.exports = { sendVerificationEmail };
