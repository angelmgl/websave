const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const { encryptPassword, matchPassword } = require("../lib/helpers");

const db = require("../database");

passport.use(
    "local.signin",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                console.log(req.body);
                const rows = await db.query(
                    "SELECT * FROM users WHERE username = ?",
                    [username]
                );
                // compare the passwords
                if (rows.length > 0) {
                    const user = rows[0];
                    const isValid = await matchPassword(password, user.password);

                    if(isValid) done(null, user, req.flash("success", "Bienvenido " + user.username));
                    if(!isValid) done(null, false, req.flash("message", "Contraseña inválida"));
                } else { // if the username provided doesnt exist
                    return done(null, false, req.flash("message", "El usuario " + username + " no existe"));
                }
            } catch (error) {
                console.log(error);
            }
        }
    )
);

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

// save the user info in memory
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// search the user id on the database
passport.deserializeUser(async (id, done) => {
    try {
        const row = await db.query("SELECT * FROM users WHERE id = ?", [id]);
        done(null, row[0]);
    } catch (error) {
        console.log(error);
    }
});
