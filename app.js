const express = require('express'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

const app = express();

const Routers = require('./routers/routers');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '35.198.219.154',
  user: 'root',
  password: '1122334455ab',
  database: 'main'
}, 'single'));
app.use(express.urlencoded({ extended: true }));

app.use('/', Routers);

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});