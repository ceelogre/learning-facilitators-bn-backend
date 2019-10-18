import { Sequelize, sequelize } from './database/config.js'
const fs = require("fs"),
    http = require("http"),
    path = require("path"),
    methods = require("methods"),
    express = require("express"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    cors = require("cors"),
    passport = require("passport"),
    errorhandler = require("errorhandler");

const isProduction = process.env.NODE_ENV === "production";

// Create global app object
const app = express();

app.use(cors());

// Normal express config defaults
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("method-override")());
app.use(express.static(__dirname + "/public"));

if (!isProduction) {
    app.use(errorhandler());
}
if (isProduction) {
    // Todo: Add PG support
} else {
    // Todo: Add PG support
    sequelize.sync()
    .then(
        console.log('ready to roll')
    )
    .catch(
        console.error('Not ready to roll.')
    )
}

app.use(require("./routes"));

/// catch 404 and forward to error handler

// will print stacktrace in dev
// no stacktraces leaked to user in prod
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: isProduction ? {} :  (() => {
                console.error('Error Stack ', err.stack)
                return err
            })()
        }
    });
});

const server = app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port " + server.address().port);
});
