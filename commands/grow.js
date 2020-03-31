exports.run = (client, message, params) => {
  let Discord = require('discord.js');
  let typeofLight
  console.log(params);
  data = [
    {factor: 43.4782608695652, name: "1. Natural Daylight 6500K"},
    {factor: 56.1085972850679, name: "2. High CRI LED 4000K"},
    {factor: 52.5557011795544, name: "3. High CRI LED 3000K"},
    {factor: 74.5889387144992, name: "4. Low CRI LED 6500K"},
    {factor: 62.3559498956159, name: "5. Low CRI LED 3500K"},
    {factor: 77.079295154185, name: "6. HPS 2000K"},
    {factor: 55.092987804878, name: "7. CMH 3000K"},
    {factor: 74.1128205128205, name: "8. Fluorescent Lamp 5000K"},
    {factor: 11.2700369913687, name: "9. Red + Blue LED 450+650 nm"},
    {factor: 38.9265536723164, name: "10. Red + Blue + White LED 450+650nm+3500K"}
  ]
  //let params = message.content
  // Delete user message if possible.
  //if (message.channel.type != `dm`) message.delete();
  let options = []
  for(var i=0; i< data.length; i++) {
    const regex = /,/g;
    options.push(data[i].name.toString().replace(/,/g, '\n'))
    
    let ty = options
  }
  //data.forEach(name => options.push(name))
  
  //console.log(options.toString());
  message.channel.send({embed:{ description: `LUX to PPFD Converter!\nWhat type of light do you have?\n ${options.toString().replace(/,/g, '\n')}`}})
  .then( async msg => {
    await msg.react(`1️⃣`)
          await msg.react(`2️⃣`)
          await msg.react(`3️⃣`)
          await msg.react(`4️⃣`)
          await msg.react(`5️⃣`)
          await msg.react(`6️⃣`)
          await msg.react(`7️⃣`)
          await msg.react(`8️⃣`)
          await msg.react(`9️⃣`)
          await msg.react(`🔟`)
  }
  )

  const filter = (reaction, user) => {
    return  user.id === message.author.id;
  };
  
  message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })

handleLux = async (typeofLight, index, lux, message) => {
  let factor = data[index].factor
  console.log(lux);
  parseFloat(lux)
  let answer = Math.floor(Math.floor(lux / factor * 100) / 100)
  console.log(`Math.round(${parseFloat(lux)} / ${factor} * 100) / 100)`);
  console.log(`Answer: ${answer}`);
  message.edit(`Total PPFD: `+Math.round(lux / factor * 100) / 100 + " umol/s/m2");
}
reactNumbertoNumber = async (react) => {
  let indexOfReact = [
    { name: `1️⃣`, number: 1 },
    { name: `2️⃣`, number: 2 },
    { name: `3️⃣`, number: 3 },
    { name: `4️⃣`, number: 4 },
    { name: `5️⃣`, number: 5 },
    { name: `6️⃣`, number: 6 },
    { name: `7️⃣`, number: 7 },
    { name: `8️⃣`, number: 8 },
    { name: `9️⃣`, number: 9 },
    { name: `🔟`, number: 10 },
  ]
  Object.values(indexOfReact).forEach(async obj => {
    if(await react == obj)
      return obj.number
  })
}

client.on(`messageReactionAdd`, react => {
  if (react.count >= 2) {
    let typeofLight = data[reactNumbertoNumber(react.emoji.name)]
    let index = data.indexOf(data[reactNumbertoNumber(react.emoji.name)]) - 1
    let filter = m => m.content;
  //react.message.edit("Thanks")
  switch(react.emoji.name){
    //
    case "1️⃣":
      react.message.edit(`Now enter your lux for ${typeofLight}`)
      .then(async message => await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(async collected => {
        result = handleLux(typeofLight, index, collected.first(), message)
      }))
      break;
      //
    case "2️⃣":
      react.message.edit(`Now enter your lux for ${typeofLight}`)
        .then(async message => await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
          result = handleLux(typeofLight, index, collected.first(), message)
        }))
        break;
      //
      //
    case "3️⃣":
        react.message.edit(`Now enter your lux for ${typeofLight}`)
        .then(async message => await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
        .then(async collected => {
          result = handleLux(typeofLight, index, collected.first(), message)
        }))
      //
  }
  
  }
  //console.log(react.message.reactions)
})


};

exports.conf = {
  name: `grow`,
  aliases: [`grow`],
  permLevel: 5,
  enabled: true,
  guildOnly: false
};