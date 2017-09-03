/************************************
 * Application variables definition
 ************************************/

var express = require('express'),    
    fs = require('fs'),
    applicationPort = 4444,
    app;
    

/************************************
 *       Application setup
 ************************************/

app = express()
    .use(express.bodyParser())
    .use(express.compress())    
    .use(express.static('public'))
    .use('/fonts', express.static('../fonts'))
    .use('/libs', express.static('../libs'));

/************************************
 *       Routes registration
 ************************************/

app.use('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

/************************************
 * Define application port and start
 ************************************/

app.listen(applicationPort, function () {
  console.log("Server ready at http://localhost:" + applicationPort);
});
