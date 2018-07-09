const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
var app = express();
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(log);
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');

});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'This is the home page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Down for maintenance'
    });
});

app.listen(3000, () => {
    console.log('Server is up on Port 3000');
});