const express = require("express");
const router = express.Router();

const passport = require("passport");

// render the form to signup
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// send the data to passport
router.post("/signup", passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

// render the profile section
router.get('/profile', (req, res) => {
    res.send('perfil');
});

module.exports = router;