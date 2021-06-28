const express = require('express') // require the express package
const app = express() // initialize your express app instance
 
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
 
app.listen(8000) // kick start the express server to work