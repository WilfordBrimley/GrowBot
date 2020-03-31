exports.run = (client, message, params) => {
  let roleToAdd = params[0]
  var role = message.guild.roles.find(role => role.name === roleToAdd);
  message.guild.members.forEach(member => {
    member.addRole(role)
    console.log(`Adding ${member.user.username}`);
  });
};

exports.conf = {
  name: `bulkrole`,
  aliases: [`bulkrole`],
  permLevel: 4,
  enabled: true,
  guildOnly: false
};