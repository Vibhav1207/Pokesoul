const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const { capitalize, getlength } = require('../../functions.js');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const Shiny = require('../../db/shiny.js');
const Gen8 = require('../../db/gen8.js');
const Forms = require('../../db/forms.js');
const Concept = require('../../db/concept.js');
const Galarians = require('../../db/galarians.js');
const Mega = require('../../db/mega.js');
const ShinyMega = require('../../db/mega-shiny.js');
const Shadow = require('../../db/shadow.js');
const Primal = require('../../db/primal.js');
const Pokemon = require('../../db/pokemon.js');
const Gmax = require('../../db/gmax.js')
const ms = require("ms");
let { MessageButton } = require('discord-buttons')


          

module.exports = {
  name: "info",
  description: "Display your selected pokemon's information.",
  category: "Pokemon Commands",
  args: false,
  usage: ["info <pokemonID>"],
  cooldown: 3,
  permissions: [],
  aliases: ["i"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = await User.findOne({ id: message.author.id });
    if (!user) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");
    if (user.selected == undefined || user.selected == null) return message.channel.send("You have to select a pokémon first!")

    const colour = "#00FFFF"
    let page = parseInt(args[0] - 1)
    if (!page) page = user.selected
    if (args[0] === "latest" || args[0] === "l"|| args[0] === "0") page = user.pokemons.length - 1
if(isNaN(page)) return message.channel.send(`Thats not a valid pokemon number!`)
if((page + 1) > user.pokemons.length) return message.channel.send(`You dont have that much pokemons!`)
    let xp = Math.floor(1.2* user.pokemons[page].level ^ 3 ) - (15 * user.pokemons[page].level ^ 2) + (100 * user.pokemons[page].level) - 140 + 52
    const embed = new Discord.MessageEmbed()

    
      .setColor(colour)
      .setTitle(`${(user.pokemons[page].shiny ? " ✨" : "")}Level ${user.pokemons[page].level} ${capitalize((user.pokemons[page].name).replace(/-+/g, " "))}`)
      .setDescription(`**═══ Stats ═══**\n`
      
        + `${user.pokemons[page].xp}/ ${xp} XP\n`
        + `**Nature:** ${user.pokemons[page].nature}\n`
        + `**HP:** - IV: ${user.pokemons[page].hp}/31\n`
        + `**Attack:** - IV: ${user.pokemons[page].atk}/31\n`
        + `**Defense:** - IV: ${user.pokemons[page].def}/31\n`
        + `**Sp. Atk:** - IV: ${user.pokemons[page].spatk}/31\n`
        + `**Sp. Def:** - IV: ${user.pokemons[page].spdef}/31\n`
        + `**Speed:** - IV: ${user.pokemons[page].speed}/31\n`
        + `**Total IV %:** ${user.pokemons[page].totalIV}%\n`
     )
      .setFooter(`Displaying Pokémon: ${page + 1}/${user.pokemons.length}`)
      .setImage(user.pokemons[page].url)

    message.channel.send({ embed }).then(msg => {
      msg.react('◀').then(r => {
        msg.react("▶")

        const back = (reaction, user) => reaction.emoji.name === "◀" && user.id == message.author.id
        const front = (reaction, user) => reaction.emoji.name === "▶" && user.id == message.author.id

        const backwards = msg.createReactionCollector(back, { timer: 120000 })
        const frontwards = msg.createReactionCollector(front, { timer: 120000 })
        backwards.on('collect', (r, u) => {
          if (page == 0) return
          page--
            
         const Canvas = require('canvas');
        const canvas = Canvas.createCanvas(512, 512);
        const context = canvas.getContext('2d');
        const background =  Canvas.loadImage("https://cdn.discordapp.com/attachments/868731354773327914/886153635497639986/2082034.jpg");
        ctx.drawImage(background,0,0,canvas.width,canvas.height)
        if (shadow) {
            let shad = "https://cdn.discordapp.com/attachments/844789985424703569/844986800015540234/iuqEeA-shadow-png-pic-controlled-drugs-cabinets-from-pharmacy.png"
            const shadow =  Canvas.loadImage(shad);
            context.drawImage(shadow, 50, 100, 400, 400);
        }
      
        const pk =  Canvas.loadImage(user.pokemons[page].url);
        context.drawImage(pk, 50, 90, 400, 400);
        
        let tx = "https://cdn.discordapp.com/attachments/844789985424703569/844984267109040138/day.png"
        const time =  Canvas.loadImage(tx);
        context.drawImage(time, 0, 0, canvas.width, canvas.height)
        
      
            
          embed
            .setColor(colour)
            .setTitle(`${(user.pokemons[page].shiny ? " ✨" : "")}Level ${user.pokemons[page].level} ${capitalize((user.pokemons[page].name).replace(/-+/g, " "))}`)
            .setDescription(`**Stats**\n`
        + `${user.pokemons[page].xp}/ ${xp} XP\n`
        + `**Nature:** ${user.pokemons[page].nature}\n`
        + `**HP:** - IV: ${user.pokemons[page].hp}/31\n`
        + `**Attack:** - IV: ${user.pokemons[page].atk}/31\n`
        + `**Defense:** - IV: ${user.pokemons[page].def}/31\n`
        + `**Sp. Atk:** - IV: ${user.pokemons[page].spatk}/31\n`
        + `**Sp. Def:** - IV: ${user.pokemons[page].spdef}/31\n`
        + `**Speed:** - IV: ${user.pokemons[page].speed}/31\n`
        + `**Total IV %:** ${user.pokemons[page].totalIV}%\n`
      )
            
            .setFooter(`Displaying Pokémon: ${page + 1}/${user.pokemons.length}`)
           .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
          .setImage("attachment://"+ "new.png")
          msg.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })
        frontwards.on('collect', (r, u) => {
          if (page == user.pokemons.length - 1) return
          page++
          embed
            .setColor(colour)
            .setTitle(`${(user.pokemons[page].shiny ? " ✨" : "")}Level ${user.pokemons[page].level} ${capitalize((user.pokemons[page].name).replace(/-+/g, " "))}`)
            .setDescription(`**Stats**\n`
      
        + `${user.pokemons[page].xp}/ ${xp} \n`
        + `**Nature:** ${user.pokemons[page].nature}\n`
        + `**HP:** - IV: ${user.pokemons[page].hp}/31\n`
        + `**Attack:** - IV: ${user.pokemons[page].atk}/31\n`
        + `**Defense:** - IV: ${user.pokemons[page].def}/31\n`
        + `**Sp. Atk:** - IV: ${user.pokemons[page].spatk}/31\n`
        + `**Sp. Def:** - IV: ${user.pokemons[page].spdef}/31\n`
        + `**Speed:** - IV: ${user.pokemons[page].speed}/31\n`
        + `**Total IV %:** ${user.pokemons[page].totalIV}%\n`
     )
            .setFooter(`Displaying Pokémon: ${page + 1}/${user.pokemons.length}`)
            .setImage(user.pokemons[page].url)
          msg.edit(embed)
          r.users.remove(r.users.cache.filter(u => u === message.author).first())
        })
      })
    })
  }
}
