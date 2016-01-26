var fs = require('fs');
var express = require('express');
var jade = require('jade');
var app = express();
var pageDefaults = {
  title: 'chco'
};

app.set('view engine', 'jade');
app.use('/assets', express.static('assets'));
app.use('/dam', express.static('dam'));
app.set('views', __dirname + '/pages');

app.get('/', function(req, res) {
  res.render('index', pageDefaults);
});

app.get('/renderHTML', function(req, res) {
  fs.readdir(__dirname + '/pages', function(err, files){
    if(err) throw err;
    else {
      files.forEach(function(val, i){
        var
          compilePage = jade.compileFile(__dirname + '/pages/' + val),
          target = 'static/' + val.replace('jade', 'html');

        fs.writeFile(target, compilePage(pageDefaults), function(err){
          if(err) throw err;
        });
      });
      res.send('rendering');
    }
  });
});

app.get('*', function(req, res) {
  var url = /.html$/.test(req.url) ?
    req.url.substring(0, req.url.lastIndexOf('.html')) :
    req.url;

  fs.access('./pages' + url + '.jade', fs.R_OK, function(err){
    if(err) res.send('page not found :(');
    else res.render(url.slice(1), pageDefaults);
  });
});

app.listen(3000);