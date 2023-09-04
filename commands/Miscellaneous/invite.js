
const Discord = require("discord.js");

const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
    name: "invite",
    description: "invite the bot to your server",
    category: "miscellaneous",
    args: false,
    usage: ["invite"],
    cooldown: 3,
    permissions: [],
    aliases: [""],
    execute: async (client, message, args, prefix, guild, color, channel) => {

     let embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} - Invite`)
        .setDescription(`**Invite The Bot**\n[Click Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2148002881&scope=bot).\n**Support Server**\n[Click Here](https://discord.gg/pokesoul).`)
        .setColor(color)
        .setThumbnail(client.user.displayAvatarURL())

        



        return message.channel.send(embed)
    }
};