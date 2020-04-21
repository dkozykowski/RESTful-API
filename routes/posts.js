const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('We are on ebebe');
});

router.get('/2', (req, res) => {
    res.send('We are on ebebe');
});

module.exports = router;