exports.run = (client, message, params) => {
  // Empty message handler
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
  message.channel.send(params.join(` `))
    .catch(e => client.log.error(e));
};

exports.conf = {
  name: `say`,
  aliases: [`say`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};