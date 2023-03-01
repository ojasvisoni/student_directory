
const cors = require('cors');   
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(cors());
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running')
})