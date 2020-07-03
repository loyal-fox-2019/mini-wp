const fs = require('fs')
const http = require('http')
const file = fs.createWriteStream('https://ui-avatars.com/api/?name=dimitri%20wahyudiputra&size=512')

fs.readlink('https://ui-avatars.com/api/?name=dimitri%20wahyudiputra&size=512', function(err, data) {
  if (err) throw err;
  console.log(data)
});