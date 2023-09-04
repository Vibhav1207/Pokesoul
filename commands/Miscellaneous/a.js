const Discord = require('discord.js')
const { get } = require('request-promise-native')
const { classToPlain } = require('class-transformer')
const User = require('../../models/user.js')

const { capitalize, getlength } = require("../../functions.js");

module.exports = {
  name: "open",
  description: "open a crate",
  category: "Pokemon",
  args: true,
  usage: ["open <crate name>"],
  cooldown: 3,
  permissions: [],
  aliases: ["o"], 
 
  execute: async (client, message, args, prefix, guild, color, channel) => {

     let user = await User.findOne({id: message.author.id})

   if(args[0].toLowerCase() === "diamond-crate") {

       if(user.lcrates === 0) return message.channel.send(`You dont have enough crate!`)

       let pokes = ["palkia","bidoof","persian","pikachu","meowth","regice","tynamo","bidoof","lugia","eevee","regirock","mewtwo","arceus","dialga"]


      let poke = pokes[Math.floor(Math.random() * pokes.length)]
      
      let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; 
    let type; 
    
      await get(options).then(async t1 => {
      
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url;
    if (check === 1) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t1.id}.png`
    } else if (check === 2) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t1.id}.png`
    } else if (check === 3) {
      url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t1.id}.png`
    }

      

   
  
    let lvl = Math.floor(Math.random() *4)+ 1;

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv =(((hp + atk + def + spatk + spdef + speed))/186)*100
let iv = totaliv.toFixed(2);
      
       user.pokemons.push({
      level: lvl,
      xp: 0,
      name: poke,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: false,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    })
    await user.markModified(`pokemons`)
    user.lcrates = user.lcrates - 1

    await user.save();

    

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle('Opening Crate...')
    .setDescription(` **Rewards Recived**\n Level ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
   

  return message.channel.send(embed)
  })
      } else  if(args[0].toLowerCase() === "shcrate") {

       if(user.shcrate === 0) return message.channel.send(`You don\'t have enough SHcrate!`)

       let pokes = ["rockruff","ponyta","persian","pikachu","meowth","regice","tynamo","bidoof","lugia","eevee","regirock"]


      let poke = pokes[Math.floor(Math.random() * pokes.length)]
      
      let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; 
    let type; 
    
      await get(options).then(async t1 => {
      
        t = t1; //ezzz
        let re;
        type = t.types.map(r => {
          if (r !== r) re = r ;
          if (re == r) return;
          return `${r.type.name}`
        }).join(" | ")

        let check = t1.id.toString().length

    let url =
    `https://assets.poketwo.net/shiny/${t1.id}.png?v=26`
   
    let imgname = 'new.png'
    let lvl = Math.floor(Math.random() *4)+ 1;

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv =(((hp + atk + def + spatk + spdef + speed))/186)*100
let iv = totaliv.toFixed(2);
      
       user.pokemons.push({
      level: lvl,
      xp: 0,
      name: poke,
      hp: hp,
      atk: atk,
      def: def,
      spatk: spatk,
      spdef: spdef,
      speed: speed,
      moves: [],
      shiny: true,
      rarity: type,
      nature: 'Hasty',
      url: url,
      totalIV: iv

    })
    await user.markModified(`pokemons`)
    user.shcrate = user.shcrate - 1
    user.egg = user.egg + 1
    await user.save();

    

    let embed = new Discord.MessageEmbed()
    .setColor('#add8e6')
    .setTitle('Opening Mystery Crate...')
    .setDescription(` **Rewards Recived**\n   Level ${lvl} ✨ Shiny  ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
     .setThumbnail(url)
     .setFooter(`You also recived 10 eggs `)
  return message.channel.send(embed)
    })
} else {
  message.channel.send(`wrong arguments`)
}//lol u here
}//yes lol but u gone
  }