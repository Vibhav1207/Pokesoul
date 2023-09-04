const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
const { capitalize } = require("../../functions.js");

module.exports = {
  name: "move-info",
  description: "gives move Info",
  category: "Pokemon",
  args: true,
  usage: ["move-info <pokemon name>"],
  cooldown: 3,
  permissions: [],
  aliases: ["mi","moveinfo"],
  execute: async (client, message, args, prefix, guild, color, channel) => {

    

    	let user = await User.findOne({ id: message.author.id });
  if(!user) return message.channel.send("You haven't started yet!")


    let Name = args.join("-").toLowerCase()

   

    const options = {
      url: `https://pokeapi.co/api/v2/move/${Name}`,
      json: true
    }

   

    try {
      await get(options).then(t => {

         let accuracy =  t.accuracy

    if (accuracy === null) accuracy = 'Never Misses'

        let embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(`${capitalize(t.name)}`, true)
        .addField('Power', t.power, true)
        .addField('Accuracy', accuracy, true)
        .addField('PP', t.pp, true)
        .addField('Priority', t.priority, true)
        .addField('Type',` ${capitalize(t.type.name)}`, true)
        .addField('Category',` ${capitalize(t.damage_class.name)}`, true)
        message.channel.send(embed)
      })
    }catch (error) {
      if (error.message.includes(`404 - "Not Found"`)) return message.channel.send(`This Move doesn't seem to exists`)
    }
  }
}
        
