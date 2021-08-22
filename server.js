// server.js
// where your node app starts
// init project
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const express = require('express'),
      app = express(),
      cors = require('cors'),
      bodyParser = require('body-parser');

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

//reqheaderjsonparser
app.get('/api/whoami', (req, res)=>{
  const x  = {
  'ipaddress':req.ip,
  'language':req.header('accept-language'),
  'software':req.header('user-agent')
  };
  res.json(x);
});

//timestamp
app.get('/api', (req, res)=>{
  const obj = {'unix': new Date().getTime(), 'utc': new Date().toUTCString()};
  res.send(obj)
});
app.get('/api/:date?', (req, res, next)=>{
  const obj = (x) => {
    let resul;
    if (Date.parse(x)) {
      y = Date.parse(x);
      resul = new Date(x);
    }else if (x.length == 13) {
      resul = new Date(parseFloat(y));
    };
    return resul?
      {'unix': resul.getTime(), 'utc': resul.toUTCString()}:
      { error : "Invalid Date" };
  };

  res.send(obj(req.params.date));
});


//reqheader-parser

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
