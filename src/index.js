require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars"); // HTML template engine
const path = require("path"); // handle file paths in the project
const flash = require("connect-flash"); // to show feedback notifications
const session = require("express-session"); // maintains sessions on the server
const MySQLStore = require("express-mysql-session"); // save sessions on the DB
const passport = require("passport");

const { database } = require("./keys");

// inits
const app = express();
require("./lib/passport");


// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // /views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // /views/layouts
    partialsDir: path.join(app.get('views'), 'partials'), // /views/partials
    extname: '.hbs',
    helpers: require("./lib/handlebars")
})); // set the template engine
app.set('view engine', '.hbs');


// middlewares
app.use(session({
    secret: 'angelmgl',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash()); // to show feedback notifications when you delete or modify links
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // to req and res json files through an API
app.use(passport.initialize());
app.use(passport.session());


// global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links", require("./routes/links"));


// public files
app.use(express.static(path.join(__dirname, 'public')));


// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server listening on port: ${app.get('port')}`);
});