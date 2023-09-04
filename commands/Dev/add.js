const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");
const os = require('os')

module.exports = {
  name: "add",
  description: "add item to users account",
  category: "dev",
  args: false,
  usage: ["add <user> <item> <amount>"],
  cooldown: 3,
  permissions: [],
  aliases: [],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.tag === args[0]);
    if (!user) return message.channel.send("Mention an User to Give Balance to.");

    let userDB = await User.findOne({ id: user.id });
    if (!userDB) return message.channel.send("That user is not listed in DB!");

    let amount = args[2];
    if (isNaN(amount)) return message.channel.send(`${amount} is not a valid Number!`);
    amount = parseInt(amount)

    let op = message.client.users.cache.get(user.id);

    if (args[1].toLowerCase() === "cc") {
      let codeembed2 = new MessageEmbed()
        .setDescription(`Confirm to give ${amount}  Coins to ${user}'s account?`)
        .setColor(color)
      let msg = await message.channel.send(codeembed2);

      await msg.react("✅")
      await msg.react("❌")

      let filter = (reaction, user) => user.id !== message.client.user.id;
      let collector = msg.createReactionCollector(filter, {
        time: 45000
      });

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === "✅") {
          let embed = new MessageEmbed()
            .setDescription(`:white_check_mark: Successfully added ${amount}  coins to ${op.username}'s account!`)
            .setColor(color)
          userDB.balance = userDB.balance + amount;
          await userDB.save();
          collector.stop();
          return message.channel.send(embed)
          await msg.delete();
        }
        if (reaction.emoji.name === "❌") {
          collector.stop();
          return message.channel.send("ABORTED!");
          await msg.delete();
        }
      });
      collector.on('end', collected => {
        return msg.reactions.removeAll();
      });
    } else if (args[1].toLowerCase() === "redeems") {

      let codeembed2 = new MessageEmbed()

        .setDescription(`Confirm to give ${amount} Redeems to ${user}'s account?`)
        .setColor(color)
      let msg = await message.channel.send(codeembed2);

      await msg.react("✅")
      await msg.react("❌")

      let filter = (reaction, user) => user.id !== message.client.user.id;
      let collector = msg.createReactionCollector(filter, {
        time: 45000
      });

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === "✅") {
          let embed = new MessageEmbed()
            .setDescription(`:white_check_mark: Successfully added ${amount} Redeems to ${op.username}'s account!`)
            .setColor(color)
          userDB.redeems = userDB.redeems + amount;
          await userDB.save();
          collector.stop();
          return message.channel.send(embed)
          await msg.delete();
        }
        if (reaction.emoji.name === "❌") {
          collector.stop();
          return message.channel.send("ABORTED!");
          await msg.delete();
        }
      });
      collector.on('end', collected => {
        return msg.reactions.removeAll();
      });

    } else if (args[1].toLowerCase() === "shards") {

      let codeembed2 = new MessageEmbed()
        .setDescription(`Confirm to give ${amount} Shards to ${user}'s account?`)
        .setColor(color)
      let msg = await message.channel.send(codeembed2);

      await msg.react("✅")
      await msg.react("❌")

      let filter = (reaction, user) => user.id !== message.client.user.id;
      let collector = msg.createReactionCollector(filter, {
        time: 45000
      });

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === "✅") {
          let embed = new MessageEmbed()
            .setDescription(`:white_check_mark: Successfully added ${amount} Shards to ${op.username}'s account!`)
            .setColor(color)
          userDB.shards = userDB.shards + amount;
          await userDB.save();
          collector.stop();
          return message.channel.send(embed)
          await msg.delete();
        }
        if (reaction.emoji.name === "❌") {
          collector.stop();
          return message.channel.send("ABORTED!");
          await msg.delete();
        }
      });
      collector.on('end', collected => {
        return msg.reactions.removeAll();
      });

    } else if (args[1].toLowerCase() === "lcrate") {

      let codeembed2 = new MessageEmbed()
        .setDescription(`Confirm to give ${amount} LCrate to ${user}'s account?`)
        .setColor(color)
      let msg = await message.channel.send(codeembed2);

      await msg.react("✅")
      await msg.react("❌")

      let filter = (reaction, user) => user.id !== message.client.user.id;
      let collector = msg.createReactionCollector(filter, {
        time: 45000
      });

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === "✅") {
          let embed = new MessageEmbed()
            .setDescription(`:white_check_mark: Successfully added ${amount} LCrates to ${op.username}'s account!`)
            .setColor(color)
          userDB.lcrate = userDB.lcrate + amount;
          await userDB.save();
          collector.stop();
          return message.channel.send(embed)
          await msg.delete();
        }
        if (reaction.emoji.name === "❌") {
          collector.stop();
          return message.channel.send("ABORTED!");
          await msg.delete();
        }
      });
      collector.on('end', collected => {
        return msg.reactions.removeAll();
      });

    } else if (args[1].toLowerCase() === "mcrate") {

      let codeembed2 = new MessageEmbed()
        .setDescription(`Confirm to give ${amount} MCrate to ${user}'s account?`)
        .setColor(color)
      let msg = await message.channel.send(codeembed2);

      await msg.react("✅")
      await msg.react("❌")

      let filter = (reaction, user) => user.id !== message.client.user.id;
      let collector = msg.createReactionCollector(filter, {
        time: 45000
      });

      collector.on('collect', async (reaction) => {
        if (reaction.emoji.name === "✅") {
          let embed = new MessageEmbed()
            .setDescription(`:white_check_mark: Successfully added ${amount} MCrates to ${op.username}'s account!`)
            .setColor(color)
          userDB.mcrate = userDB.mcrate + amount;
          await userDB.save();
          collector.stop();
          return message.channel.send(embed)
          await msg.delete();
        }
        if (reaction.emoji.name === "❌") {
          collector.stop();
          return message.channel.send("ABORTED!");
          await msg.delete();
        }
      });
      collector.on('end', collected => {
        return msg.reactions.removeAll();
      });

    } else {
      message.channel.send("That's not a valid item!")
    }
  }
}