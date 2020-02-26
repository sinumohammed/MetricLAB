// importing modules

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const config = require('./database/config/config');
const route = require('./router/route');
const serveStatic = require('serve-static')

const app = express();

// connet to mongodb
mongoose.connect(config.mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// on connection
mongoose.connection.on('connected', () => {
    console.log(`connected to db:${config.mongodb.url}`);
})
// on error
mongoose.connection.on('error', (err) => {
    console.log('Error in connection', err);
})

// using middleware - cors
app.use(cors());

// morgan for log 
app.use(morgan('combined'));

// body-parserr
app.use(bodyparser.json());

//static files - serving build front end app , that are copied into public folder from dist client folder
//app.use(express.static(path.join(__dirname,'public')));

// First serve static pages from dist folder
var staticPage = serveStatic('public', {})
app.use(staticPage)


// the regex will check if the request url is not /api then redirect to index.html
app.get(/^((?!\/api\/).)*$/, function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

//passport authentication 
require('./passport')

// add routes
require('./router/route')(app)

app.listen(config.port, () => {
    console.log(`Server started at port: ${config.port}`);
})