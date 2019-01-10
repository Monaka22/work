const express = require('express'),
  path = require('path'),
  morgan = require('morgan'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection');

const app = express();
//const session  = require('express-session');

const Routers = require('./routers/routers');

// app.use(session({
//   secret: 'codemobiles', cookie: { maxAge: 3600000 },
//   resave: true, saveUninitialized: false
// }));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '35.198.219.154',
  user: 'root',
  password: '1122334455ab',
  database: 'main'
}, 'single'));
//app.use(express.urlencoded({ extended: true }));

// app.get('/login', function(req, res){

//   const _username = req.query.username;
//   const _password = req.query.password;

//   if (req.query.username == "admin" && req.query.password == "qwerty"){
//     req.session.username = req.query.username;
//     req.session.isLoggedIn = true;
//     app.use('/', Routers);
//     res.end("Can use API.");
//   }else{
//     res.send("Invalid username and password");
//   }
// });
// app.get('/logout', function(req, res){
//   req.session.destroy();
//   app.use(errorHandle());
//   res.end("Logout complete")});
// app.get('/addemp',function (req,res) {
//   res.render('emp_add.ejs');
// });
app.use('/',Routers);

var server = app.listen(9000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s", host, port);
});