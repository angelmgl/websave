require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars"); // HTML template engine
const path = require("path"); // handle file paths in the project


// inits
const app = express();


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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // to req and res json files through an API


// global variables
app.use((req, res, next) => {
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