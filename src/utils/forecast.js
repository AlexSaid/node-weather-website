const request = require("request");
//------------------------------------
const forecast = function(latitude, longitude, callback){
 const url = "https://api.darksky.net/forecast/8a6779543370feb8823030c60ca57266/"+ latitude + "," + longitude;
 request({url, json: true}, (error, {body} ) => {
  
   if(error){
     callback("Unable to connect make sure you connected to the internet", undefined)
    }
    else if(body.error){
     callback("Unable to connect to location try change search", undefined);
    }
    else{
     callback(undefined, body.daily.data[0].summary + " its currently " + body.currently.temperature + " degree thers a  " + body.currently.precipProbability + "% chance of rain");
    }
})
}

module.exports = forecast;