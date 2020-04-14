var mosca = require('mosca');
var setting = {port: 1234}

var broker = new mosca.Server(setting)

broker.on('ready', () =>{
    console.log('Broker is Ready !');
})
broker.on('published', (packet)=>{
    console.log(packet.payload.toString())
})