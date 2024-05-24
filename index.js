// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// Middleware to parse incoming requests
app.use(express.json());

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const handleTimestamp = (timestamp, res) => {
  const date = new Date(parseInt(timestamp, 10));
  if (!isNaN(date.getTime())) {
    res.json({
      unix: parseInt(timestamp, 10),
      utc: date.toUTCString(),
    });
  } else {
    res.status(400).json({ error: 'Invalid timestamp format' });
  }
};

const handleDateString = (dateString, res) => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  } else {
    res.status(400).json({ error: 'Invalid date string format' });
  }
};

app.get('/api/:date', (req, res) => {
  const dateParam = req.params.date;

  if (/^\d+$/.test(dateParam)) {
    // Handle timestamp
    handleTimestamp(dateParam, res);
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    // Handle date string
    handleDateString(dateParam, res);
  } else {
    res.status(400).json({ error: 'Invalid date format' });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
