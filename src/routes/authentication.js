const express = require("express");
const router = express.Router();

const passport = require("passport");
const { isLoggedIn, isAlreadyLoggedIn } = require("../lib/auth");

// render the form to signup
router.get("/signup", isAlreadyLoggedIn, (req, res) => {
    res.render("auth/signup");
});

// send the data to passport
router.post(
    "/signup",
    isAlreadyLoggedIn,
    passport.authenticate("local.signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true,
    })
);

// render the form to login
router.get("/signin", isAlreadyLoggedIn, (req, res) => {
    res.render("auth/signin");
});

// send the data to passport to login
router.post("/signin", isAlreadyLoggedIn, (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true,
    })(req, res, next);
});

// render the profile section
router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
});

// logout
router.get("/logout", isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect("/signin");
});

module.exports = router;
