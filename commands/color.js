exports.run = (client, message, args) => {
  // Empty message handler
  if (args == "") {
    message.channel.send({
        embed: {
          description: `usage: ${config.prefix}color I am a brown bear.`
        }
      })
      .catch(e => client.log.error(e));
    return;
  }
  if (message.channel.type != `dm`) message.delete();
  message.channel.send(params.join(` `))
    .catch(e => client.log.error(e));
};

exports.conf = {
  name: `color`,
  aliases: [`color`],
  permLevel: 5,
  enabled: true,
  guildOnly: false
};