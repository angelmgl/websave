const express = require("express");
const router = express.Router();

const db = require("../database");

router.get('/add', (req, res) => {
    res.render('links/add');
});

router.post('/add', (req, res) => {
    res.send("recibido");
});

module.exports = router;