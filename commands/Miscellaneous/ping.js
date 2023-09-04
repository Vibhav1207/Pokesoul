const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
	name: "ping",
    description: "Get bot ping.",
    category: "Miscellaneous",
    args: false,
    usage: ["ping"],
    cooldown: 3,
    permissions: [],
    aliases: [""],
		name: "ping",
	execute: async (client, message, args, prefix, guild, color, channel) => {
    let circles = {
            green: "🟢",
            yellow: "🟡",
            red: "🔴"
        }
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

       let start = Date.now();
        let ping = time - message.createdTimestamp
        let apiLatency = client.ws.ping;

        const pingEmbed = new MessageEmbed()
            .setColor(color)
            .addField("Bot Latency",
                `${ping <= 200 ? circles.green : ping <= 400 ? circles.yellow : circles.red} ${ping}ms`
                , true
            )
            .addField("API Latency",
                `${apiLatency <= 200 ? circles.green : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                , true
            )
            .addField("Client Uptime",
                `${days}d ${hours}h ${minutes}m ${seconds}s`
                , true
            )

      message.channel.send(pingEmbed)
    },
};