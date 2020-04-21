const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('We are on home');
});

app.get('/ebe', (req, res) => {
    res.send('We are on ebebe');
});

app.listen(3000);


