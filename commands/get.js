exports.run = (client, message, params) => {
  lastBotMsg = [];
  message.channel.send(`Are your plants drooping?`)
  .then((message) => {
    message.channel.awaitMessages(response => response.content === 'yes' || `no`, {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then((collected) => {
      })
      .catch((collected) => {
        console.log(collected.content)
        if(collected.content === `yes` || `y`) {
          message.reply(`Do you grow Hydro? Or roots sitting in water?`)
          message.channel.awaitMessages(response => response.content === 'yes' || `no`, {
            max: 1,
            time: 30000,
            errors: ['time'],
          })
          .then((collected) => {
            })
            .catch((collected) => {
              console.log(collected.content)
              if(collected.content === `yes` || `y`) {
                message.reply(`Plants droop when the roots aren't getting enough oxygen, In hydro, wilting means high heat, Rot, or not enough bubbles.`)
              } else if(collected.content === `no` || collected.content === `n`) {
                message.reply(`Do you have bugs / mold? White spots or bites on leaves?`)
              } else {
                message.reply(`invalid response`);
              }
              //message.channel.send('There was no collected message that passed the filter within the time limit!');
            });
        } else if(collected.content === `no` || collected.content === `n`) {
          message.reply(`Do you have bugs / mold? White spots or bites on leaves?`)
        } else {
          message.reply(`invalid response`);
        }
        //message.channel.send('There was no collected message that passed the filter within the time limit!');
      });
  })
  .then((message) => {

  })

};

exports.conf = {
  name: `get`,
  aliases: [`get`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};