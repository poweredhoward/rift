var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

var instream = fs.createReadStream('./students.txt');
var outstream = new stream;
var rl = readline.createInterface(instream, outstream);

var arr = [];

rl.on('line', function(line) {
  // process line here
  arr.push(line);


});

rl.on('close', function() {
  // do something on finish here
  var students = [];
  arr.forEach(function(s){
      var line = s.split(" ");
      var email = line[line.length - 1];
      var name = line.slice(0,line.length - 1).join(" ");
      var entry = {
          name: name,
          email: email
      }
      students.push(entry);

  })
  console.log('students', students);
});