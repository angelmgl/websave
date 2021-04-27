module.exports = {

    /* to protect the routes like profile, links, add */
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect("/signin");
        }
    },

    // to prevent that logged users can visit login and signup page
    isAlreadyLoggedIn: (req, res, next) => {
        if(!req.isAuthenticated()) {
            return next();
        } else {
            return res.redirect("/profile");
        }
    }

}