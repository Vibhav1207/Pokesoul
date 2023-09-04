const Discord = require("discord.js");
const { MessageEmbed, MessageCollector, Collection } = require("discord.js");
const { get } = require('request-promise-native');
const User = require('../../models/user.js');
const Guild = require('../../models/guild.js');
const ms = require("ms");

module.exports = {
  name: "start",
  description: "Find out how to get your first pokémon!",
  category: "GettingStarted",
  args: false,
  usage: ["start"],
  cooldown: 3,
  permissions: [],
  aliases: [],

  async execute(client, message, args, prefix, guild, color, channel) {
    let user = await User.findOne({ id: message.author.id });



    let embed = new MessageEmbed()
      .setAuthor("Professor Oak", "https://media.discordapp.net/attachments/811830543061876757/811848174033305640/Professor_Oak.jpg")
      .setTitle("Hello " + message.author.username + "!")
      .setDescription(`**Welcome to the world of Pokémon!**`
        + `\nTo begin playing, choose one of these pokémon with the \`${prefix}pick <pokemon>\` command. \nLike this: \`${prefix}pick squirtle\``)
      .addField(`__**Generation I (Kanto)**__`, `<:bulbasaur:886558905939947571> Bulbasaur • <:Charmander:886558912537587734> Charmander • <:ps_squirtle:886559776593575976> Squirtle`)
      .addField(`**__Generation II (Johto)__**`, `<:chikorita:886560156735909938> Chikorita • <:cyndaquil:886570918795685948>  Cyndaquil • <:totodile:886570985963274240> Totodile`)
.addField(`__**Generation III (Hoenn)**__`, `<:treecko:886572384172245032> Treecko • <:torchic:886572427184848936> Torchic • <:mudkip:886572602401902592> Mudkip`)
      .addField(`**__Generation IV (Sinnoh)__**`, ` <:turtwig:886572709390188555> Turtwig • <:Chimchar:886572716012994580> Chimchar • <:piplup:886572769947570216> Piplup`)
      .addField(`**__Generation V (Unova)__**`, ` <:snivy:886573817340756018> Snivy • <:Tepig:886573812378902559> Tepig • <:Oshawott:886573821623140412> Oshawott`)
      .addField(`__**Generation VI (Kalos)**__`, ` <:chespin:886574368967258112> Chespin • <:fennekin:886574373853622342> Fennekin • <:froakie:886574407055724574> Froakie`)
      .addField(`__**Generation VII (Alola)**__`, ` <:rowlet:886575575353942037> Rowlet • <:litten:886574905024454706> Litten • <:popplio:886575037350559774> Popplio`)
      .addField(`__**Generation VIII (Galar)**__`, ` <:Grooky:886575094338551839> Grookey • <:Scorbunny:886575136315170836> Scorbunny • <:Sobble:886575204581670923> Sobble`)
      .setColor(color)
      
      .setImage("https://cdn.discordapp.com/attachments/832971783674003487/854357391843131402/sY8w0zz.png")

    return message.channel.send(embed)
  }
}
