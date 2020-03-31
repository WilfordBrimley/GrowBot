module.exports = async (client) => {
  let TimeStamp = (new Date().toISOString().replace(/.+T/, `[`).replace(/\..+/, `]`));
  console.log((`LoveBot has Connected In ${await client.guilds.size} guilds. ${TimeStamp}`));
  console.log(client.tree.asTree(client.user, true, true));
 
  const mqtt = require('mqtt'),
  ip = `192.168.0.12`;
var unhandledTopics = [],
  dclient = mqtt.connect(`tcp://${ip}:2883`),
  // Handle our topics
  handleInstantDemand = (message) => {
      let reading = JSON.parse(message),
          time = new Date(reading.time).toLocaleTimeString(),
          demand = reading.demand / 1000
          client.user.setPresence({ game: { name: `Instant Demand: ${demand}KW` }, status: 'online' })

      //console.log(`[${time}] Instant Demand: ${demand}KW`)

  };

  dclient.on(`connect`, () => {
      dclient.subscribe(`event/metering/instantaneous_demand`) 
      dclient.subscribe(`#`)
      
      console.log(`Connected: ${dclient.connected}`)
  });

  dclient.on(`message`, (topic, message) => {
      switch (topic) {
          case `event/metering/instantaneous_demand`:
              return handleInstantDemand(message)
          //TODO more topics
      }
      console.log(`There's nothing to do with topic: ${topic} : ${message}`)
      unhandledTopics.push(`Topic: ${topic} Message: ${message}`) //debug point
  });

};