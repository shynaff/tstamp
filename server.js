// server.js
// where your node app starts
// init project
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser'), 
      { json } = bodyParser.json();

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

app.get('/api', (req, res)=>{
  const obj = {'unix': new Date().getTime(), 'utc': new Date().toUTCString()};
  res.send(obj)
});

app.get('/api/:date?', (req, res)=>{
  const obj = (y) => {
    let x;
    if (Date.parse(y)) {
      y = Date.parse(y);
      x = new Date(y);
    }else if (y.length == 13) {
      x = new Date(parseFloat(y));
    };
    return x?{'unix': x.getTime(), 'utc': x.toUTCString()}:{ error : "Invalid Date" };
  };

  res.send(obj(req.params.date));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
