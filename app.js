const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  bodyPar =require('body-parser');

const app = express();
// importing routes
const Routers = require('./routers/routers');
//lul
// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyPar.json());
//app.use(multer());

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '35.198.219.154',
  user: 'root',
  password: '1122334455ab',
  database: 'main'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', Routers);

// static files
//app.use(express.static(path.join(__dirname, 'public')));

// starting the server
var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});