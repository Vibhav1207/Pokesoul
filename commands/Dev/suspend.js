const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const client = new Discord.Client()

module.exports = {
  name: "suspend",
  description: "suspends a user",
  category: "dev",
  args: true,
  usage: ["suspend <user>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let usera = message.mentions.users.first() || client.users.cache.get(args[0])
    if(!usera) return message.channel.send('Pls mention a user!')

    	let user = await User.findOne({ id: usera.id });
      let reason = args[1]
      if (!reason) {return message.channel.send('Pls give a reason to suspend!')
      } else {

      user.blacklist = true
      await user.save()
      usera.send(`You have been suspended from playing Pokesoul for: ${reason}`)
      message.channel.send(`Successfully Suspended **${usera.tag}** for reason **${reason}**!`)
      }
  }
}