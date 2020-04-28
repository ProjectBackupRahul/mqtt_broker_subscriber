var mosca = require('mosca');
var setting = {port: 1234}
var broker = new mosca.Server(setting)

// MongoDB config 

var mongo = require('mongodb')
var mongoClient = mongo.MongoClient
var url = 'mongodb://RahulS:12345@localhost:27017/mqttJSDB'

broker.on('ready', () =>{
    console.log('Broker is Ready !');
})
broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
    if (message.slice(0,1) != '{' && message.slice(0,4) != 'mqtt'){
        mongoClient.connect(url, (error, client)=>{
            var myCollection = client.db('mqttJSDB').collection('mqttJS')
            myCollection.insertOne({
                message: message
            }, ()=>{
                console.log('Data is saved to mongo DB')
                client.close()
            })
        })
    }
})