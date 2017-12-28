var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var RedisStore = require('connect-redis')(session);

var hbs = require('hbs');
var helpers = require('./hbs-helpers/helpers');
var credentials = require('./configs/credentials');
var routes = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

helpers(hbs);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/icon', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    store: new RedisStore({
        host: credentials.redis_host,
        port: credentials.redis_port,
        ttl: credentials.ttl
    }),
    secret: credentials.cookieSecret,
    cookie: {
        maxAge: 1000 * 60 * 30, //half an hour
    },
    saveUninitialized: false,
    resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

//set routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('Error/PageNotFound', {
        
    });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;