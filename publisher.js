//MQTT Publisher 
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234')
var topic = 'MQTT_TEST_1234'
var message = "Hello message from publisher"

client.on ('connect', ()=>{
    setInterval(() =>{
        client.publish(topic, message)
        console.log('Message sent', message)
    }, 5000)
})