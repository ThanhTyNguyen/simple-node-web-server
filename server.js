const express = require('express');
const fs = require('fs');
var app = express();

// process.env is an object that stores all our environment variables at key value pair
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}.`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    next()
});

app.get('/', (req, res) => {
    res.send({
        name: 'Nguyen',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});

app.get('/about', (req, res) => {
    res.send('About page');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, (req, res) => {
    console.log(`server is running at port ${port}`);
});