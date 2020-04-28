//MQTT Publisher with web Client
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1234')
const express = require('express');
const bodyParser = require("body-parser");
const app = express()
var topic = 'MQTT_TEST_1234'
var messageToClient = "";
const PORT = process.env.PORT || 9200;

//@ Configuring os for network Interface .
var os = require('os');
var ifaces = os.networkInterfaces();
//@ Configuring os for network Interface

app.use(bodyParser.urlencoded({ extended: false }));

// @ Sending message on connect to the subscriber client
/*client.on ('connect', ()=>{
    setInterval(() =>{
        client.publish(topic, message)
        console.log('Message sent', message)
    }, 5000)
})*/

// @ ROUTE  : GET
// @ URL    : /
// @ Access : Public

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  });

// @ ROUTE  : POST
// @ URL    : /msg
// @ Access : Public

app.post('/msg', (req, res)=>{
    var username = req.body.username;
    var recivedMessage = req.body.message;
    console.log(`POST request: username is: ----- ${username} and message is : ------- ${recivedMessage}`);
    res.end(`Your message received Mr(s) ${username}`);
    messageToClient = recivedMessage;

    client.publish(topic, messageToClient)
    console.log('Message sent', messageToClient)
});

app.listen(PORT, async () => {
    genURL();
  });

// @ Function to generate local machine URL
const genURL=() => {
    Object.keys(ifaces).forEach( (ifname) =>{
      var alias = 0;
      ifaces[ifname].forEach( (iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          return;
        }
        if (alias >= 1) {
        } else {
          var url = 'http://'+iface.address+':'+PORT+'/'
          console.log(url);
        }
        ++alias;
      });
    });
  }

