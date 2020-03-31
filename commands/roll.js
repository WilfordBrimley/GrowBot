exports.run = (client, message, params) => {
  let Selected 
  /** Data conversion for lux to par */
  let data = [
      [43.4782608695652, "Natural Daylight 6500K", "6500k-ppf-d65"],
      [28.9136150234742, "Halogen Lamp 3000K", "3000k-ppf-halogen"],
      [58.0260303687636, "High CRI LED 6500K", "6000k-ppf"],
      [56.1085972850679, "High CRI LED 4000K", "4000k-ppf"],
      [52.5557011795544, "High CRI LED 3000K", "3000k-ppf"],
      [74.5889387144992, "Low CRI LED 6500K", "6000k-ppf-lc"],
      [62.3559498956159, "Low CRI LED 3500K", "3500k-ppf-lc"],
      [77.079295154185, "HPS 2000K", "2000k-ppf-hps"],
      [55.092987804878, "CMH 3000K", "3000k-ppf-cmh"],
      [74.1128205128205, "Fluorescent Lamp 5000K", "5000k-ppf-fl"],
      [13.0122950819672, "Monochromatic Red LED 650 nm", "650-ppf-red"],
      [8.65410497981157, "Monochromatic Blue LED 450 nm", "450-ppf-blue"],
      [11.2700369913687, "Red + Blue LED 450+650 nm", "450-650-ppf-red-blue"],
      [38.9265536723164, "Red + Blue + White LED 450+650nm+3500K", "450+650+white-ppf"]
    ],

    traditionalLighting = `1. Natural Daylight 6500K
  2. High Pressure Sodium 2000K
  3. Ceramic Metal Halide 3000K
  4. Flourescent Lamp 5000K`,

    blurpleLED = `1. Monochromatic Red LED 650 nm
  2. Monochromatic Blue LED 450 nm
  3. Red + Blue LED 450+650 nm
  4. Red + Blue + White LED 450+650nm+3500K`,

    whiteLED = `1. High CRI LED 6500K
  2. High CRI LED 6500K
  3. High CRI LED 4000K
  4. High CRI LED 3000K
  5. Low CRI LED 6500K
  6. Low CRI LED 3500K`,

    initMenu = new(require(`discord.js`)).RichEmbed()
    .setTitle(`**Lux to PPFD**`)
    .setDescription(`Please select the type of light that you have...
    `)
    .addField(`1️⃣ **-__Traditional Lighting__**`, traditionalLighting, false)
    .addField(`2️⃣ **-__Blurple LED__**`, blurpleLED, false)
    .addField(`3️⃣ **-__White LED__**`, whiteLED, false),

    init = () => {
      message.channel.send(initMenu)
        .then(async message => {
          await message.react(`1️⃣`)
          await message.react(`2️⃣`)
          await message.react(`3️⃣`)
          await message.react(`🔙`)
          let filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' && user.id === 'someID';
          let collector = message.createReactionCollector(filter, {
            time: 100000
          });
          collector.on('collect', react => {
            if (react.emoji == `1️⃣` && react.count == 2) {
              collector.stop();
              traditionalLightingHandler(react.message)
              
            }
            if (react.emoji == `2️⃣` && react.count == 2) {
              collector.stop();
              blurpleLEDLightingHandler(react.message)
              
            }
            if (react.emoji == `3️⃣` && react.count == 2) {
              collector.stop();
              whiteLEDLightingHandler(react.message)
              
            }
            if (react.emoji == `🔙` && react.count == 2) {
              collector.stop();
              react.message.edit(initMenu)
            }

          })
          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
         // message.awaitReactions
        })
        .catch(e => console.log(e));
    },

    traditionalLightingHandler = (message) => {
      traditionalLightingMenu = new(require(`discord.js`)).RichEmbed()
        .setTitle(`**Lux to PPFD**`)
        .setDescription(`Please select the type of light that you have...`)
        .addField(`**-__Traditional Lighting__**`, traditionalLighting, false)

      lightSelectedMenu = new(require(`discord.js`)).RichEmbed()
      .setTitle(`**Lux to PPFD**`)
      .setDescription(`Please enter the lux read on your meter for ${Selected}`)
      .addField(`**-__Traditional Lighting__**`, traditionalLighting, false)

      message.edit(traditionalLightingMenu)
        .then(async message => {
          // Set reactions for this menu
          await message.reactions.forEach(async react => {
            await react.remove()
          });
          await message.react(`1️⃣`)
          await message.react(`2️⃣`)
          await message.react(`3️⃣`)
          await message.react(`4️⃣`)
          await message.react(`🔙`)
          // Create a reaction collector
          
          let filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' && user.id === 'someID';
          let collector = message.createReactionCollector(filter, {
            time: 15000
          });
          collector.on('collect', react => {
            if(react.message.user.id === message.user.id) return;
            react.remove();
            if (react.emoji == `1️⃣` && react.count == 2) {
              collector.stop();
              Selected = `Natural Daylight 6500K`
              react.message.edit(lightSelectedMenu)
           
              
            }
            if (react.emoji == `2️⃣` && react.count == 2) {
              collector.stop();
              Selected = `High Pressure Sodium 2000K`
              react.message.edit(lightSelectedMenu)
              
            }
            if (react.emoji == `3️⃣` && react.count == 2) {
              collector.stop();
              Selected = `Ceramic Metal Halide 3000K`
              react.message.edit(lightSelectedMenu)
              
            }
            if (react.emoji == `4️⃣` && react.count == 2) {
              collector.stop();
              Selected = `Flourescent Lamp 5000K`
              react.message.edit(lightSelectedMenu)
              
            }
            if (react.emoji == `🔙` && react.count == 2) {
              collector.stop();
              Selected = ``
              react.message.edit(initMenu)
            }

          })
          collector.on('end', collected => console.log(`Collected ${collected.size} items`));
        })
    },

    blurpleLEDLightingHandler = (message) => {
      blurpleLEDMenu = new(require(`discord.js`)).RichEmbed()
        .setTitle(`**Lux to PPFD**`)
        .setDescription(`Please select the type of light that you have...
    `)
        .addField(`**-__Blurple LED__**`, blurpleLED, false)

      message.edit(blurpleLEDMenu)
      .then(async message => {
        // Set reactions for this menu
        await message.reactions.removeAll()
        await message.react(`1️⃣`)
        await message.react(`2️⃣`)
        await message.react(`3️⃣`)
        await message.react(`4️⃣`)
        await message.react(`🔙`)
        // Create a reaction collector
        let filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' && user.id === 'someID';
        let collector = message.createReactionCollector(filter, {
          time: 15000
        });
        collector.on('collect', react => {
          if (react.emoji == `1️⃣` && react.count == 2) {
            collector.stop();
         
            
          }
          if (react.emoji == `2️⃣` && react.count == 2) {
            collector.stop();
        
            
          }
          if (react.emoji == `3️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `4️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `🔙` && react.count == 2) {
            collector.stop();
            react.message.edit(initMenu)
          }

        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      })
    },

    whiteLEDLightingHandler = (message) => {
      whiteLEDMenu = new(require(`discord.js`)).RichEmbed()
        .setTitle(`**Lux to PPFD**`)
        .setDescription(`Please select the type of light that you have...
    `)
        .addField(`**-__White LED__**`, whiteLED, false)

      message.edit(whiteLEDMenu).then(async message => {
        // Set reactions for this menu
        await message.reactions.removeAll()
        await message.react(`1️⃣`)
        await message.react(`2️⃣`)
        await message.react(`3️⃣`)
        await message.react(`4️⃣`)
        await message.react(`🔙`)
        // Create a reaction collector
        let filter = (reaction, user) => reaction.emoji.name === '1️⃣' || reaction.emoji.name === '2️⃣' || reaction.emoji.name === '3️⃣' || reaction.emoji.name === '4️⃣' || reaction.emoji.name === '5️⃣' || reaction.emoji.name === '6️⃣' && user.id === 'someID';
        let collector = message.createReactionCollector(filter, {
          time: 15000
        });
        collector.on('collect', react => {
          if (react.emoji == `1️⃣` && react.count == 2) {
            collector.stop();
         
            
          }
          if (react.emoji == `2️⃣` && react.count == 2) {
            collector.stop();
        
            
          }
          if (react.emoji == `3️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `4️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `5️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `6️⃣` && react.count == 2) {
            collector.stop();
          
            
          }
          if (react.emoji == `🔙` && react.count == 2) {
            collector.stop();
            react.message.edit(initMenu)
          }

        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      })

    }

  
  /**TODO: User selects light type here 
  var spdSelect = document.getElementById("spdSelect");
  var userChoice = thisthing;


  for (var z = 0; z < data.length; z++) {
    var option = document.createElement("option");
    option.text = data[z][1];

    spdSelect.add(option);
  }

  if (document.getElementById("calc")) {
    document.getElementById("calc").addEventListener("click", calcCCT);
  } else if (document.getElementById("calc2")) {
    document.getElementById("calc2").addEventListener("click", calcCCT2);
  } else if (document.getElementById("calc3")) {
    document.getElementById("calc3").addEventListener("click", calcCCT3);
  } else {
    document.getElementById("calc4").addEventListener("click", calcCCT4);
  }

  function calcCCT() {

    var x = document.getElementById("x").value;
    var spdName = document.getElementById("spdSelect").selectedIndex;
    var factor = (data[spdName][0]);
    document.getElementById("result").innerHTML = Math.round(x / factor * 100) / 100 + " umol/s/m2";

  }

  function calcCCT2() {

    var x = document.getElementById("x").value;
    var spdName = document.getElementById("spdSelect").selectedIndex;
    var factor = (data[spdName][0]);
    document.getElementById("result").innerHTML = Math.round(x * factor) + " lux";

  }

  function calcCCT3() {

    var x = document.getElementById("x").value;
    var spdName = document.getElementById("spdSelect").selectedIndex;
    var factor = (data[spdName][0]);
    document.getElementById("result").innerHTML = Math.round(x / factor * 100) / 100 + " umol/s";

  }

  function calcCCT4() {

    var x = document.getElementById("x").value;
    var spdName = document.getElementById("spdSelect").selectedIndex;
    var factor = (data[spdName][0]);
    document.getElementById("result").innerHTML = Math.round(x * factor) + " lumens";

  }

  function updateSPD() {

    var spdName = document.getElementById("spdSelect").selectedIndex;
    if (spdName < 0) {
      spdName = 0;
    }
    var spdGraphic = document.getElementById(data[spdName][2]);

    hideAllBut(spdGraphic);
    document.getElementById("result").innerHTML = "-";

    //   document.getElementById("imgholder").src = 'https://www.waveformlighting.com/img/450-ppf-blue.png';
  }

  function hideAllBut(spdGraphic) {
    var pics = document.getElementsByClassName("wp-image-727");
    for (var g = 0; g < pics.length; g++) {

      var pic = pics[g];
      if (pic == spdGraphic) {
        pic.style.display = "block";
      } else {
        pic.style.display = "none";
      }
    }

  }

  function showAll() {
    var pics = document.getElementsByClassName("wp-image-727");
    for (var g = 0; g < pics.length; g++) {

      var pic = pics[g];
      pic.style.display = "block";

    }


  }
*/
  init()
};

exports.conf = {
  name: `lux`,
  aliases: [`lux`],
  permLevel: 5,
  enabled: true,
  guildOnly: false
};