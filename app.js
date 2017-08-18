console.log('ghost toast');

const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const app = express();

const logins = [{username:'dragon', password:'fire'}, {username:'arya', password:'needle'}];

app.use(bodyParser.urlencoded({
  extended: false
}))

app.set('trust proxy', 1)
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.engine('mustache', mustacheExpress());

app.set('views', './views')
app.set('view engine', 'mustache')

app.use(function(req, res, next) {
  console.log('in interceptor');
  if (req.url == '/login') {
    next()
  } else if (!req.session.login) {
    res.render('login')
  } else {
    next()
  }
})

app.get('/', function(req, res) {
  res.render('home')
})

app.post('/login', function(req, res) {
  console.log("username is " + req.body.username);
  console.log("password is " + req.body.password);
  for (let i = 0; i < logins.length; i++) {
    if (req.body.username === logins[i].username && req.body.password === logins[i].password) {
      req.session.login = req.body.username
      res.render('home');
    }
    else{
      res.render('login', {oops: true})
    }
  }
})

app.listen(3000, function() {
  console.log('App listening on port 3000!');
});
