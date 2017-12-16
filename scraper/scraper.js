var Crawler = require("node-webcrawler");

//Temporary writes a file becous no database 
var fs = require("fs");

var c = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
       
        if(error){
            console.log(error);
        }else{
            
            switch (result.request.uri.host) {
                case "www.lavinprognoser.se":
                    var forecast_swe = {};
                    forecast_swe["forecasts"] = {};

                    $("article.Forecast").each(function( index ) {
                        var area = $(this).find("h1").text().trim().replace("Lavinprognos för ", "");
                        var forecast = $(this).find("h2.Forecast-risk").text();
                        
                        forecast_swe["forecasts"][area] = forecast;
                    });

                    forecast_swe["updated_at"] = new Date().toUTCString();

                    fs.writeFile("./data/sweden.json", JSON.stringify(forecast_swe, null, 4), "utf8", function(err) {
                        if(err) console.log(err);                        
                    });

                    break;
                case "www.varsom.no":
                    var forecast_nor = {};
                    forecast_nor["forecasts"] = {};

                    $("table.table tbody tr").each(function( index ) {
                        var area = $(this).find("td.region a").text();
                        var forecast = $($(this).find("td.weekday")[0]).find("a div.warning").text().trim();

                        forecast_nor["forecasts"][area] = Number(forecast);
                    });

                    forecast_nor["updated_at"] = new Date().toUTCString();

                    fs.writeFile("./data/norway.json", JSON.stringify(forecast_nor, null, 4), "utf8", function(err) {
                        if(err) console.log(err);                        
                    });

                    break;
                default:
                    break;
            }

        }
    }
});


c.queue([
    'http://www.lavinprognoser.se/oversikt-alla-omraden/',
    'http://www.varsom.no/snoskredvarsling/'
]);