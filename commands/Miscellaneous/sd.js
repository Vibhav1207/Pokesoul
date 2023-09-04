const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const Guild = require(`../../models/guild.js`)
const User = require('../../models/user.js')
module.exports = {
  name: "soul-destruction",
  description: "Start SoulDestructioN",
  category: "Miscellaneous",
  args: true,
  usage: ["soul-destruction"],
  cooldown: 3,
  permissions: [],
    aliases: ["sd"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

 if(args[0].toLowerCase() === "buy") {

    let guildop = Guild.findOne({id: message.guild.id})

  let user = await User.findOne({id: message.author.id})

  if (!user) return message.channel.send(`You have not started yet! Type \`${guild.prefix}start\` to start!`)


       if(user.redeems <= 0) return message.channel.send(`You don\'t have enough shards!`)
    
guild.incense = true
guild.incenseamount = 30 
await guild.save()

 user.redeems = user.redeems - 2
    await user.save()

    message.channel.send(` You bought Soul-DestructioN for 2 Redeems. Iwill Spawn Nice IV pokemons and 30% Faster pokemon spawns!!`)
  }
  }
}