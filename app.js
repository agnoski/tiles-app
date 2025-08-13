const websocket = require('ws')
const express = require('express')
const app = express()
const wss = new websocket.Server({ noServer: true })
const port = 3000

app.get('/', (req, res) => {
  //res.send('<h1>Hello world!</h1>')
  res.sendfile('public/index.html')
})

wss.on('connection', (ws) => {
  console.log(`Client ${ws} connected`)
})

const httpServer = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

function onSocketPreError(e) {
  console.log(e)
}
function onSocketPostError(e) {
  console.log(e)
}

httpServer.on('upgrade', (req, socket, head) => {
  socket.on('error',onSocketPreError) 
  
  wss.handleUpgrade(req, socket, head, (ws) => {
    socket.removeListener('error', onSocketPreError)
    wss.emit('connection', ws, req)
  })
})

wss.on('connection', (ws, req) => {
  ws.on('error', onSocketPostError)

  ws.on('message', (msg, isBinary) => {
    console.log(`Received: ${msg.data}`)
    wss.clients.forEach((client) => {
      if(client.readyState === websocket.OPEN) {
        client.send(msg, {binary: isBinary})
      }
    })
  })

  ws.on('close', () => {
    console.log('Connection closed')
  })
})
