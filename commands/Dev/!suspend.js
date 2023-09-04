const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')

module.exports = {
  name: "unsuspend",
  description: "unsuspends a user",
  category: "dev",
  args: false,
  usage: ["unsuspend <user> <reason>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let usera = message.mentions.users.first() || client.users.cache.get(args[0])
    

    	let user = await User.findOne({ id: usera.id });
  
      if(!usera) {return message.channel.send('Pls mention a user!')
      } else if (user.blacklist === false) { return message.channel.send("That user isn't suspended!")
      
      } else {

      user.blacklist = false
      await user.save()
      usera.send(`You have been unsuspended from playing  bot!`)
      message.channel.send(`Successfully Unsuspended **${usera.tag}**!`)
      }
  }
}