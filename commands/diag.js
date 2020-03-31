exports.run = (client, message, params) => {
//Setup question
let Discord = require(`discord.js`)
let puppeteer = require(`puppeteer`)
let url = `https://www.growweedeasy.com/cannabis-symptoms-pictures`
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('.pt-cv-wrapper');
                items.forEach((item) => {
                    results.push({
                        url:  item.getAttribute('href'),
                        text: item.innerText,
                    });
                });
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);
  
  
};

exports.conf = {
  name: `diag`,
  aliases: [`diag`],
  permLevel: 0,
  enabled: true,
  guildOnly: false
};