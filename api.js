const express = require('express');
const https = require('https');
const BodyParser= require("body-parser");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    // res.send("Server is Up and Running");
    res.sendFile(__dirname + "/index.html");
    
})
app.post("/",(req,res)=>{
    // console.log("post received");
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q= "+ query +" &appid=6ca4e11c6b2f8b40967bf9f6082ef254&units=metric";
    https.get(url,(response)=>{
    console.log(response.statusCode);
     
    response.on("data",(data)=>{
        // console.log(data);
       const WhetherDadta= JSON.parse(data);
       console.log(WhetherDadta);
       const temp = WhetherDadta.main.temp
       console.log(temp);
       
       const weatherDes=WhetherDadta.weather[0].description
       console.log(weatherDes);
       res.write("<p>The weather is currently "+ weatherDes + "</p>");
       res.write("<h1>The Temperature in " + query +" is " + temp + " degree Celcius.</h1>");
       res.send();
    })

    })
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running on 3000 port");

});