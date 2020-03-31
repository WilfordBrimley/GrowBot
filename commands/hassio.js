exports.run = (client, message, params) => {
  // Empty message handler
  const HomeAssistant = require('homeassistant');
  const hass = new HomeAssistant({

    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIxOTFiMTUzNmRjOTA0ZjEzYjM5OWU5NmRhZTBhMzM0MiIsImlhdCI6MTU4NTM2NzAyNiwiZXhwIjoxOTAwNzI3MDI2fQ.ltjJ96W7fNW79fjcyHOaIGnpH85Mt1FVZQ49y5yV5v0',
    host: `http://raspberrypi.local`,
    ignoreCert: false
  });
// Returns an array of event objects
(async ()=>{
temp = await hass.states.get('sensor', params[0])
let temps = temp.state
message.reply("Your "+params[0]+" is: "+temps+"F")
})()
};

exports.conf = {
  name: `hassio`,
  aliases: [`hassio`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};