const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); // partial files
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// To put into maintenance mode
// app.use((req, res) => {
//   res.render('maintenance.hbs');
// });

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

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to process request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});