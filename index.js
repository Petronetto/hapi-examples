'use strict'

const Hapi = require('hapi')

// Create server and connection
const server = new Hapi.Server()
server.connection({
  port: 3000
})

// const pre1 = (request, reply) => {
//   return reply('Hello world')
// }

server.method('m1', (request, reply) => {
  return reply('Hello world')
})

const pre2 = (request, reply) => {
  return reply(' from HapiJs!')
}

const pre3 = (request, reply) => {
  return reply(request.pre.m1 + request.pre.m2)
}

// Creating routes
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply(request.pre.m3)
  },
  config: {
    pre: [
      [{
        method: 'm1'
      }, {
        method: pre2,
        assign: 'm2'
      }], {
        method: pre3,
        assign: 'm3'
      }
    ]
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at: ', server.info.uri)
})



