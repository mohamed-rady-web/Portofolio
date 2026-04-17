const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`[ CONTACT ] ${name} <${email}>`);
    res.status(200).json({ success: true, message: 'Message securely transmitted.' });
});

module.exports = router;