var express = require('express');
var path = require('path');

var app = express();

app.get('/', function (req, res) {
  res.sendFile('app.html', { root: __dirname });
});

app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || "dev";

app.listen(port, function () {
  console.log(`${env} listening on ${port}...`);
})