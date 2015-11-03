"use strict";

const PORT = process.env.PORT || 3000;
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var auth = require('./routes/auth');
var gists = require('./routes/gists');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));   // enable PUT & DELETE methods;

// app.use('/auth', auth);
// app.use('/gists', gists);
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index.html');
});
app.get('/api/gists', (req, res) => {
  // get the gists from github.com
});

app.listen(PORT, () => {
  console.log('API is now listening on: ', PORT);
});