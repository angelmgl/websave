const express = require("express");
const router = express.Router();

const passport = require("passport");

// render the form to signup
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// send the data to passport
router.post(
    "/signup",
    passport.authenticate("local.signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true,
    })
);

// render the form to login
router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

// send the data to passport to login
router.post("/signin", (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true,
    })(req, res, next);
});

// render the profile section
router.get("/profile", (req, res) => {
    res.send("perfil");
});

module.exports = router;
