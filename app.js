const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postsRoute = require('./routes/posts');

// package used to hide password to DB in .env
require('dotenv/config');

// connect to database
// LOGIN_URL hidden in .env file - we dont want ppl to know our password
mongoose.connect(process.env.LOGIN_URL, { useNewUrlParser: true },  () =>
    console.log('Successfully connected to DataBase')
); 

app.use(bodyParser.json());

// import routes
app.use('/', postsRoute);

// home page
app.get('/', (req, res) => {
    res.send('Home Page');
});

// set up server port
app.listen(3000);


