/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var sass = require('node-sass');
var config = require('./config')();
var app = express();
////var MongoClient = require('mongodb').MongoClient;

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(express.cookieParser('your secret here'));
//app.use(express.session());
app.use(app.router);


// set pretty html. coment for production
app.locals.pretty = true;

//app.use(require('less-middleware')(path.join(__dirname, 'public')));


//app.use(sass.middleware({
//    src:   __dirname + '/public',
//    dest:  __dirname + '/public',
//    debug: true,
//    outputStyle: 'compressed'
//}));

app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//
//http.createServer(app).listen(config.port, function(){
//    console.log('Express server listening on port ' + config.port);
//});

//
//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

//MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/okgrafix', function(err, db) {
//    if(err) {
//        console.log('Sorry, there is no mongo db server running.');
//    } else {
//        var attachDB = function(req, res, next) {
//            req.db = db;
//            next();
//        };
//        app.all('/admin*', attachDB, function(req, res, next) {
//            Admin.run(req, res, next);
//        });
//        app.all('/blog/:id', attachDB, function(req, res, next) {
//            Blog.runArticle(req, res, next);
//        });
//        app.all('/blog', attachDB, function(req, res, next) {
//            Blog.run(req, res, next);
//        });
//        app.all('/services', attachDB, function(req, res, next) {
//            Page.run('services', req, res, next);
//        });
//        app.all('/careers', attachDB, function(req, res, next) {
//            Page.run('careers', req, res, next);
//        });
//        app.all('/contacts', attachDB, function(req, res, next) {
//            Page.run('contacts', req, res, next);
//        });
//        app.all('/', attachDB, function (req, res, next) {
//
//            console.log('ALL', req, res);
//            Home.run(req, res, next);
//        });

        http.createServer(app).listen(config.port, function () {
            console.log(
                'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
                '\nExpress server listening on port ' + config.port
            );
        });
//    }
//});