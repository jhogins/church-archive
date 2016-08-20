var express = require('express');
var fs = require('fs');
var app = express();

app.use (function(req, res, next) {
    var data='';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
       data += chunk;
    });

    req.on('end', function() {
        req.body = data;
        next();
    });
});

app.post('/sermonarchive', function (req, res) {
  fs.writeFileSync('../sermonsite2/sermonarchive.json', req.body);
});
app.listen(80);