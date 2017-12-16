var express = require('express');
var fs = require("fs");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  fs.readFile("./views/index.html", "utf8", function (err, data) {
    if(err){
        res.sendStatus(500);
    }else{
        res.send(data);
    }
  });
});

app.get("/api/v1/forecasts", function(req, res) {
    var forecasts = {
        data: {}
    };
    if(req.query.area) var areas = req.query.area.split(",");
    try {
        var country_forcasts = require("./data/" + req.query.country + ".json");
        if(req.query.area)
            for (let i = 0; i < areas.length; i++)
                forecasts["data"][areas[i]] = country_forcasts.forecasts[areas[i]];
        else
            forecasts.data = country_forcasts.forecasts;

        forecasts["updated_at"] = country_forcasts.updated_at;

        res.send(forecasts);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(3000, function () {
    console.log("running on port 3000");    
});