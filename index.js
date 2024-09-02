// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// make date endpoint
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  const currentTime = new Date();
  // if no date provided
  if (!date) {
    res.json({ "utc": currentTime.toUTCString(), "unix": Date.now() });
  }
  // if date is valid new Date

  const newDate = new Date(date);
  const unixOut = Date.parse(date);
  if (newDate != "Invalid Date") {
    res.json({ "unix": unixOut, "utc": new Date(date).toUTCString() })
  // else if valid Unix entry 
  } else if (!isNaN(parseInt(date))) {
    res.json({ "unix": parseInt(date), "utc": new Date(parseInt(date)).toUTCString() });
  } else {
  // else invalid message
    res.json({ "error": "Invalid Date" });
  }
});





// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
