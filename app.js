var express = require('express');
var path = require('path');

var app = express();

app.get('/', function (req, res) {
  res.sendFile('app.html', { root: __dirname });
});

app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
})
