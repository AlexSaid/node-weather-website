const request = require("request");
//------------------------------------------------
const geocode = function(address, callback){
 const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoic2FpZGxhbWUiLCJhIjoiY2sxcDJmc2FpMDNsYTNubW96cWh1am42dSJ9.fkOi4zQKLtf8VsOeDENkvA";
 request({ url, json: true}, function(error, {body}){
       if(error){
         callback("Unable to connect to location", undefined);
       }else if(body.features.length === 0){
          callback("unable to find location try another search", undefined);
       }else{
         callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
         })
       }
   })
 }
 module.exports = geocode;





 
