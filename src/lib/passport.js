const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { encryptPassword, matchPassword } = require("../lib/helpers");

const db = require("../database");

passport.use(
    "local.signup",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            const { fullname } = req.body;

            const newUser = {
                username,
                password,
                fullname,
            };
            // encrypt the password
            newUser.password = await encryptPassword(password);
            // send the query
            const res = await db.query("INSERT INTO users SET ?", [newUser]);

            // mysql returns an object where we can find the new id
            newUser.id = res.insertId;
            return done(null, newUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const row = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        done(null, row[0]);
    } catch (error) {
        console.log(error);
    }
});
