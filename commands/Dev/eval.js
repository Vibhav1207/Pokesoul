const discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const hastebin = require("hastebin-gen");
const { uptime } = require('process');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");


module.exports = {
  name: "eval",
  description: "Evals the code",
  category: "Dev",
  args: false,
  usage: ["eval <code>"],
  cooldown: 3,
  permissions: [],
  aliases: [],

  execute: async (client, message, args, prefix, guild, color, channel) => {
  	 function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        let owner = ['636158569338634272']

        if (!owner.includes(message.author.id)) return;

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

            message.react("✅");
            var emb = new MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send(emb);
        } catch (err) {
            message.react("⚠");
            var emb = new MessageEmbed()
                .setTitle('Result')
                .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setColor(0xd26a0e)
            message.channel.send(emb);
        }
    }
}
