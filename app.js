var express = require('express');
var https = require("https");
var bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.urlencoded({extended:true}));

var up = "https://api.openweathermap.org/data/2.5/weather?q="
var low = "&appid=c5c9021ab88eb53dd028c7f87c6dd03e"

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/index.html");
})

app.post('/',(req,res)=>{
  var city = req.body.cityName;
  https.get(up+city+low,(responce)=>{
    responce.on('data',(data)=>{
      var weatherData= JSON.parse(data);
      var temp = weatherData.main.temp;
      var t = parseInt(temp-273.15);
      var weatherCondition = weatherData.weather[0].main;
      var forimage = weatherData.weather[0].icon;
      var imageUrl = "http://openweathermap.org/img/wn/"+forimage+"@2x.png";
      res.write("<h1 style='text-align:center;color:#6E85B7;margin-top:20%'> The temperature at "+city+" is "+t+" C </h1>");
      res.write("<div style='margin-left:50%;color:#6E85B7'><h2> It's "+weatherCondition+"<img src="+imageUrl+"></h2></div>")
      res.send();
    })
  })
})

app.listen(3000,(res)=>{
  console.log("the server is up and running at 3000");
})
