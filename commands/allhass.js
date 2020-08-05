exports.run = async (client, message, params) => {
  // Empty message handler
  const HomeAssistant = require('homeassistant');
  const hass = new HomeAssistant({
    host: `http://192.168.0.31`,
    port: `8123`,
    token: '',
    ignoreCert: true
  });
// Returns an array of event objects
temp = await hass.states.get('sensor', params[0])
let temps = temp.state
let propTemp = await hass.states.get(`sensor`, `propagation_temperature`)
let propHum = await hass.states.get(`sensor`, `propagation_humidity`)
let two4Temp = await hass.states.get('sensor', `2x4_Temperature`)
let two4Hum = await hass.states.get('sensor', `2x4_Humidity`)
let four4Temp = await hass.states.get('sensor', `4x4_Temperature`)
let four4Hum  = await hass.states.get('sensor', `4x4_Humidity`)
let four8Temp  = await hass.states.get('sensor', `temperature`)
let four8Hum  = await hass.states.get('sensor', `humidity`)
let pressure =  await hass.states.get('sensor', `Pressure`)
console.log(pressure)


message.channel.send(`Fetching data...`)
.then(async (message) => {
  let embed = new (require(`discord.js`)).RichEmbed()
.setTitle(`Grow Info`)
.setDescription(`**Propagation info:**
Temperature: **${await propTemp.state}F**
Humidity: **${await propHum.state}**
**2x4 info: **
Temperature: **${await two4Temp.state}F**
Humidity: **${await two4Hum.state}**
**4x4 info**
Temperature: **${await four4Temp.state}F**
Humidity: **${await four4Hum.state}**
**4x8 info:**
Temperature: **${await four8Temp.state}F**
Humidity: **${await four8Hum.state}**
**General Pressure: ${await pressure.state}**

`)
  intervalFunc = (message) => {
    message.channel.send(embed)
      .then(async (msg) => {
        let embed = []
        let propTemp = await hass.states.get(`sensor`, `propagation_temperature`)
 propHum = await hass.states.get(`sensor`, `propagation_humidity`)
 two4Temp = await hass.states.get('sensor', `2x4_Temperature`)
 two4Hum = await hass.states.get('sensor', `2x4_Humidity`)
 four4Temp = await hass.states.get('sensor', `4x4_Temperature`)
 four4Hum  = await hass.states.get('sensor', `4x4_Humidity`)
 four8Temp  = await hass.states.get('sensor', `temperature`)
 four8Hum  = await hass.states.get('sensor', `humidity`)
 pressure =  await hass.states.get('sensor', `Pressure`)
        msg.delete(99990)
      })
  }
  setInterval(() => intervalFunc(message), 100000)
})
.catch(err => console.log(err))
}



exports.conf = {
  name: `allhass`,
  aliases: [`allhass`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};
