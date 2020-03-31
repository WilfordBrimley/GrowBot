exports.run = (client, message, args, perms) => {
    if(perms < 2) return;
    if(args == "") {
        return message.channel.send("Specify stream URL");
    }
    message.channel.send(`Fetching stream...`)
      .then((message) => {
        client.ffmpeg(`${args}`)
          .format('image2')
          .outputOptions(['-r 1/30', '-updatefirst 1'])
          .saveToFile('img.jpg')
          .on('error', function(err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function() {
            console.log('Processing finished !');
        })
        intervalFunc = () => {
          message.channel.send('*Live feed*', {
              files: [`./img.jpg`]
            })
            .then((msg) => {
              msg.delete(29999)
            })
        }
        setInterval(() => intervalFunc(message), 30000)
      })
      .catch(err => console.log(err))
  };
  
  exports.conf = {
    name: `stream`,
    aliases: [`stream`],
    permLevel: 5,
    enabled: true,
    guildOnly: false
  };