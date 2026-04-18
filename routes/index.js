const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
    res.render('index');
});



router.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mohamed.rady99990@gmail.com',
                pass: 'hzkp olvl wxss bkms'
            }
        });

        await transporter.sendMail({
            from: email,
            to: 'mohamed.rady99990@gmail.com',
            subject: `Portfolio Contact From ${name}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully.'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message.'
        });
    }
});

module.exports = router;