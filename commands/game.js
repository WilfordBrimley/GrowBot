exports.run = (client, message, params) => {
  const adventure = require("adventurejs");
  const game = adventure.makeState();
  const Discord = require(`discord.js`)
  var on = ``;
  message.channel.send(game.advance()) // -> ["", "    Welcome to ADVENTURE!", ...]
    .then((m) => {
      // Await !vote messages
      
// Errors: ['time'] treats ending because of the time limit as an error
    client.on(`message`, (m) => {
      console.log(on)
      if(on == `false`) {
        console.log(on)
        
        return;
      }
       console.log(m.content)
      if(m.content == `exit` || `end`) {
        on == `false`
        on === `false`
      }
      
      if(m.author.bot == false) {
        m.channel.send(game.advance(m.content))
      }
    })

    
    })

};

exports.conf = {
  name: `g`,
  aliases: [`g`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};