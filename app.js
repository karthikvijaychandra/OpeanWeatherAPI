const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const city = req.body.cityName;
    req.body.metric?unit = "metric":req.body.imperial?unit = "imperial":unit = undefined;
    unit === "metric"? units = "Celsius":unit === "imperial"? units = "Fahrenheit": units = "Kelvin";
    const APIKey = "8f4aa71efb63d5c9be01a5e4ad8b5818";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=${unit}`;
    https.get(URL, function(response){
        response.on("data", function(data){
            const APIdata = JSON.parse(data);
            const temp = APIdata.main.temp;
            const weather = APIdata.weather[0].main;
            const icon = APIdata.weather[0].icon;
            res.write(`<p>The Weather is ${weather}.</p>`);
            res. write(`<p>The temperature in ${city} is ${temp} degree ${units}.</p>`);
            res.write(`<img src = http://openweathermap.org/img/wn/${icon}@2x.png>`);
            res.send();

        })
        
    });
    
})


app.listen(4000, function(){
    console.log("Server started on port 4000."); 
})