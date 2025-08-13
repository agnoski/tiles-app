ws = new WebSocket('ws://localhost:3000')

ws.addEventListener('error', () => {
  console.log('Websocket error')
})

ws.addEventListener('open', () => {
  console.log('Websocket connection established')
})

ws.addEventListener('close', () => {
  console.log('Websocket connection closed')
})

ws.addEventListener('message', (msg) => {
  console.log(`Message: ${msg.data}`)
})
