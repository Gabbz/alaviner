var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('0/api/v1/endpoint/country/:country', function (req, res) {
  res.send({
    params: req.params,
    query: req.query
  });
});
 
app.listen(3000);