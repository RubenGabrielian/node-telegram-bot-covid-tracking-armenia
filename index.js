const { Telegraf } = require('telegraf');
const request = require('request')
const API = 'https://covid19.mathdro.id/api/countries/armenia';
const bot = new Telegraf('1740475092:AAF4ydB_NRXctC3BNxGOziB5Ynbhd6wVeLE');
bot.start( ctx => ctx.reply(`
   Բարև ${ctx.from.first_name}!
   Դուք կարող եք իմանալ Հայաստանում կորոնավիրուսի մասին տիրող իրավիճակի մասին ստատիստիկա սեղմելով /get
`))


bot.on('text', async ctx => {
    if(ctx.message.text === '/get') {
        request(`${API}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let data = JSON.parse(body)
                const formatData = `
                    Հիվանդ։ ${data.confirmed.value} ,  Բուժված ${data.recovered.value}, Մահացած ${data.deaths.value},
                   
                `
              ctx.reply(formatData)
            }
       });
    }
  
})
bot.launch()
