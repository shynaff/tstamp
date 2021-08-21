// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

app.get('/api/:dat', (req, res)=>{
  let stamp, utc, result;
  if(Date.parse(req.params.dat)){
    stamp = Date.parse(req.params.dat);
    utc =new Date(stamp).toUTCString();
    result = {'unix':stamp, 'utc':utc};
  }else 
  if(/\d+/.test(req.params.dat)&&req.params.dat.length==13){
    stamp = parseFloat(req.params.dat);
    utc =new Date(stamp).toUTCString();
    result = {'unix':stamp, 'utc':utc};
  }else result = { error : "Invalid Date" };
  res.send(result);
});

app.get("/api", function (req, res) {
  let curTime = new Date();
  res.send({"unix":Date.parse(curTime),"utc":curTime.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
