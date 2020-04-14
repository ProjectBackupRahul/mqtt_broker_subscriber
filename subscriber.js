// MQTT Subscriber 
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'MQTT_TEST_1234'

client.on('message', (topic, message)=>{
 message = message.toString()
 console.log (message)

})

client.on('connect', ()=>{
    client.subscribe(topic)
})