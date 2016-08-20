var express = require('express');
var ipfilter = require('express-ipfilter');
var fs = require('fs');
var app = express();

//restrict /sermonarchive to only local ip addresses. This uses a CIDR address
var ips = [['::1', '127.0.0.1', '192.168.*.*']];
app.use(ipfilter(ips, {mode:'allow', excluding:['/sermonsite2']}));

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

app.use('/sermonadmin', express.static('sermonadmin'));
app.use('/sermonsite2', express.static('sermonsite2'));
app.use('/node_modules', express.static('node_modules'));

app.post('/sermonarchive', function (req, res) {
  fs.writeFileSync('sermonsite2/sermonarchive.json', req.body);
  var now = new Date();
  fs.writeFileSync('sermonsite2/archivebackups/sermonarchive-' + now.getMonth() + '-' + now.getDate() + '-' + now.getFullYear() + '.json', req.body);
  res.sendStatus(200);
});

app.listen(80);