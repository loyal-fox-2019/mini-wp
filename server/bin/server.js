const http = require('http')
const server = http.createServer(require('../app'))
const port = process.env.PORT

server.listen(port, ()=>{
    console.log('server listening on port', port);
})