/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config')();
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);


// set pretty html. coment for production
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, '/public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);


http.createServer(app).listen(config.port, function () {
    console.log(
        'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
        '\nExpress server listening on port ' + config.port
    );
});
