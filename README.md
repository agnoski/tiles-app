### Tiles App

Playing around with Web Sockets

## Usage
Run the application:
```js
node app.js
```

Open browser console and type the following to change one random cell color:

```js
ws.send(JSON.stringify(colorCell()))
```

Or run it 1000 times:
```js
for(let i = 0; i < 1000; i++){
    ws.send(JSON.stringify(colorCell()))
}
```
