const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.use((req, res) => {
    res.status(404).send('<h1 style="color:#00d9ff; background:#050505; height:100vh; display:flex; align-items:center; justify-content:center; margin:0; font-family:sans-serif;">404 | ENDPOINT NOT FOUND</h1>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[ SERVER ] Active on http://localhost:${PORT}`);
});