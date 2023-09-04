const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
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
 
  execute: async (client, message, args, prefix, guild, color, channel) => {

     let user = await User.findOne({id: message.author.id})
    

if (args[0] === "lcrate") {
  
  if(user.lcrate === 0) return message.channel.send("You don't have enough crates!")
  let pokes = ["articuno", "zapdos", "moltres", "mewtwo", "raikou", "entei", "suicune", "lugia", "ho-oh", "regirock", "regice", "registeel", "latias", "latios", "kyogre", "groudon", "rayquaza"]
  let poke = pokes[Math.floor(Math.random() * pokes.length)]

 let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, // bohot bdha nub hai, args[0] isme mention hai and args[1] se pokemon ka naam shru hota hai
      json: true // args slice(1) use krna tha , my mistake :(( 
    }


    let t; // abh try
    let type; //aur bhai kya haal
    
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

      

    let lvl = Math.floor(Math.random() * 100);

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv = ((hp + atk + def + spatk + spdef + speed) / 186) * 100
      
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
    })
    await user.markModified(`pokemons`)
    user.lcrate = user.lcrate - 1
    await user.save();

    let embed = new Discord.MessageEmbed()
    .setTitle('Opened Crate')
    .setDescription(`**Rewards Recieved:**\nLevel ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
    .setColor('YELLOW')
  return message.channel.send(embed)
  })
} else if (args[0] === "mcrate") {
  
  if(user.mcrate === 0) return message.channel.send("You don't have enough MCrates to do that!")
  let poke = Math.floor(Math.random()*898) 
  let url;

 let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, // bohot bdha nub hai, args[0] isme mention hai and args[1] se pokemon ka naam shru hota hai
      json: true // args slice(1) use krna tha , my mistake :(( 
    }


    let t; // abh try
    let type; //aur bhai kya haal
    
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

      

    let lvl = Math.floor(Math.random() * 100);

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv = ((hp + atk + def + spatk + spdef + speed) / 186) * 100
      
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
    })
    await user.markModified(`pokemons`)
    user.mcrate = user.mcrate - 1
    await user.save();

    let embed = new Discord.MessageEmbed()
    .setTitle('Opened Crate')
    .setDescription(`**Rewards Recieved:**\nLevel ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
    .setColor('YELLOW')
  return message.channel.send(embed)
  })
} else if (args[0] === "ncrate") {
  
  if(user.ncrate === 0) return message.channel.send("You don't have enough NCrates to do that!")
  let poke = Math.floor(Math.random() * 898) 
  let url;

 let options = {
      url: `https://pokeapi.co/api/v2/pokemon/${poke}`, 
      json: true 
    }


    let t; // abh try
    let type; //aur bhai kya haal
    
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

      

    let lvl = Math.floor(Math.random() * 100);

    let hp = Math.floor(Math.random() * 31);
    atk = Math.floor(Math.random() * 31);
    def = Math.floor(Math.random() * 31);
    spatk = Math.floor(Math.random() * 31);
    spdef = Math.floor(Math.random() * 31);
      speed = Math.floor(Math.random() * 31);

      let xp = Math.floor(1.2 * lvl ^ 3 ) - (15 * lvl ^ 2) + (100 * lvl) - 140 + 52

       let totaliv = ((hp + atk + def + spatk + spdef + speed) / 186) * 100
      
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
    })
    await user.markModified(`pokemons`)
    user.ncrate = user.ncrate - 1
    await user.save();

    let embed = new Discord.MessageEmbed()
    .setTitle('Opened Crate')
    .setDescription(`**Rewards Recieved:**\nLevel ${lvl} ${capitalize(poke)} (${totaliv.toString().substr(0,5)}% IV)`)
    .setColor(color)
  return message.channel.send(embed)
  })
} else {
  message.channel.send(`wrong arguments`)
}//lol u here
}//yes lol but u gone
}