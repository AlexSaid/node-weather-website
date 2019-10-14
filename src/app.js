const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000
// setup path directory
const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
const viewsPath = path.join(__dirname, "../template/views");
const parialsPath = path.join(__dirname, "../template/partials")


// setup handelbar engine and views engine
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(parialsPath);



app.get("", (req, res) => {
   res.render("index", {
     title: "weather App",
     name: "said hasan"
   });
})


app.get("/about", (req, res) => {
   res.render("about", {
       title: "About me",
       name: "Said Hasan"
   });
});

app.get("/help", (req, res) => {
   res.render("help", {
      heloText: "this is some helpful text",
      title: "Help",
      name: "Said hasan"
   })
});







app.get("/weather", (req, res) => {
  if(!req.query.address){
  return  res.send("You most provide address")
  }
    geocode(req.query.address, function(error, {latitude, longitude, location} = {}){
      if(error){
        return res.send({error});
      }
      forecast(latitude, longitude, (error, forCastdata) => {
        if(error){
          return res.send({error});
        }
        res.send({
          forecast: forCastdata,
           location,
          address: req.query.address
        })
    });
});

});






app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "said hasna",
    errorMessage: "Help article not found"
  })
});


app.get("*", (req, res) => {
   res.render("404", {
     title: "404",
     name: "said hasna",
     errorMessage: "Page not Found"
   })
});



app.listen(port, function(){
 console.log("app is runing on port " + port);
})