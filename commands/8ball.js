exports.run = (client, message, params) => {
  // Empty message handler
  const eightball = require('8ball')()
  if (params.length < 1) {
    message.channel.send({
        embed: {
          description: `usage: ${client.config.prefix}8ball [words]`
        }
      })
      .catch(e => client.log.error(e));
    return
  }
  if (message.channel.type != `dm`) message.delete(5000);
  message.channel.send(`🎱: ${eightball}`)
    .catch(e => client.log.error(e));
};

exports.conf = {
  name: `8ball`,
  aliases: [`8ball`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};