const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// package used to hide password to DB in .env
require('dotenv/config');

// connect to database
// LOGIN_URL hidden in .env file - we dont want ppl to know our password
mongoose.connect(process.env.LOGIN_URL, { useNewUrlParser: true },  () =>
    console.log('Successfully connected to DataBase')
); 

app.use(bodyParser.json());

// import routes
const getShortcut = require('./routes/get');
const postShortcut = require('./routes/post');
const patchShortcut = require('./routes/patch');
const deleteShortcut = require('./routes/delete');
app.use('/records', getShortcut);
app.use('/post', postShortcut);
app.use('/patch', patchShortcut);
app.use('/delete', deleteShortcut);

// home page
app.get('/', (req, res) => {
    res.send('Home Page');
});

// set up server port
app.listen(3000);


