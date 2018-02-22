const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // partial files
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); // static files

hbs.registerHelper('getCurrentYear', () => { // helper function for current year
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to process request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000!');
});