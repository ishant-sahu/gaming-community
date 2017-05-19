var fs = require('fs'),
    request = require('request'),
    path = require('path');

module.exports.download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(path.join(__dirname,"../app/images/userImages/")+filename)).on('close', callback);
  });
};

