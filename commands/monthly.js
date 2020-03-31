exports.run = (client, message, params) => {
  // Empty message handler
  let linkCheck = require(`link-check`),
    request = require('request');
  const fs = require('fs');
//check our params
  if (params.length < 1) {
    message.channel.send({
        embed: {
          description: `usage: ${client.config.prefix}monthly [image link]`
        }
      })
      .catch(e => client.log.error(e));
    return
  }
    //make sure our link is alive
  linkCheck(params[0], (err, result) => {
    if (err) {
      message.channel.send({
        embed: {
          description: `usage: ${client.config.prefix}monthly [VALID image link]`
        }
      })
      .catch(e => client.log.error(e));
    return
    }
    //link is valid process
    download(params[0], `./`+message.author.id, function(){
  console.log('done');
}); 
    console.log(`${result.link} is ${result.status}`);
});

var download = (uri, filename, callback) =>{
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
};

exports.conf = {
  name: `mon`,
  aliases: [`mon`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};