console.log('ghost toast');

const express = require('express');
// const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
// const session = require('express-session');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req,res) {
  res.render('login')
})

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
