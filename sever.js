// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

//**********************Timestamp.************************//
let responseObject = {}; // ***common for all//
app.get("/api", (req, res) => {
  responseObject["unix"] = new Date().getTime();
  responseObject["utc"] = new Date().toUTCString();
  res.json(responseObject);
});
//*******endpoint*****//
app.get("/api/:input", (req, res) => {
  //---- ' : ' this refers to url params and storied in req in middleware---//
  let input = req.params.input;
  //******datestring******//
  if (input.includes("-")) {
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  } else {
    input = parseInt(input); //*** parseInt converts string into integer***//
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  }

  //********invalid dat*********//
  if (!responseObject["unix"] || !responseObject["utc"]) {
    input = parseInt(input); //*** parseInt converts string into integer***//
    res.json({ error: "Invalid Date" });
  }
  res.json(responseObject);
});
