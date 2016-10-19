'use strict'

const Hapi = require('hapi')

// Create server and connection
const server = new Hapi.Server()

server.connection({
  port: 3000
})

// Creating routes
server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Hello World!')
  }
})

server.route({
  method: 'GET',
  path: '/json',
  handler: (request, reply) => {
    return reply({
      message: 'Hello World (JSON)'
    })
  }
})

// Register Good plugin and start the server
server.register({
  register: require('good'),
  options: {
    reporters: {
      console: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [
            {
              log: '*',
              response: '*'
            }
          ]
        },
        {
          module: 'good-console',
        },
        'stdout'
      ]
    }
  }
},(err) => {
  if (err) {
    throw err
  }

  // Start the server
  server.start((err) => {
    if (err) {
      throw err
    }

    console.log('Server is running at: ', server.info.uri)
  })
})
