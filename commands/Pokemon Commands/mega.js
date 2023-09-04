const User = require('../../models/user.js')
const Guild = require('../../models/guild.js')
var mega = require("./../../db/mega.js");

module.exports = {
  name: "mega",
  description: "mega your s p",
  category: "Economy",
  args: true,
  options: [""],
  cooldown: 3,
  permissions: [],
  aliases: ["m"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let nguild = await Guild.findOne({ id: message.guild.id });
    var amount = parseInt(1000)
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let user = await User.findOne({id: message.author.id});
    if(!user) {
      return client.embed(message.channel, {
      name: " | You must pick your starter Pokemon with <prefix>start before using this command.",
      av: message.author.avatarURL({format: "png", dynamic: true})
    });
    }
    var selected = user.selected - 1;
    var name = user.pokemons[selected].name;
    for(let i=0;i<mega.length;i++){
      if(mega[i].name.toLowerCase().startsWith(!user.pokemons[selected].name.toLowerCase()) && !user.pokemons[selected].name.toLowerCase().startsWith("mega-")){
        return message.reply("Selected pokemon don't have any mega form.")
      }
      else if(mega[i].name.toLowerCase().startsWith(user.pokemons[selected].name.toLowerCase()) && !user.pokemons[selected].name.toLowerCase().startsWith("mega-")){
        if(mega[i].name.endsWith("-y") && args[0] == "-y"){
          name = "mega-" + mega[i].name.toLowerCase()
        }
        else if(mega[i].name.endsWith("-x") && args[0] == "x"){
          name = "mega-" + mega[i].name.toLowerCase()
        }
        else if(!mega[i].name.endsWith("-x" || "-y") && message.content.endsWith("mega")){
          name = "mega-" + mega[i].name.toLowerCase()
        }
      }
    }
    
    const mg = mega.find(e => e.name.toLowerCase().endsWith(name.toLowerCase()))
    const mgy = mega.find(e => e.name.toLowerCase().endsWith("-y") && e.name.toLowerCase().startsWith(name.toLowerCase()))
    const mgx = mega.find(e => e.name.toLowerCase().endsWith("-x") && e.name.toLowerCase().startsWith(name.toLowerCase()))
    if(user.pokemons[selected].name.startsWith("mega-")) return message.reply(`Your selected pokemon is already a mega.`)
    if(!mg && !mgy && !mgx){
      return message.reply("This pokemon don't have any mega form.")
    }
    if(user.balance < amount) return message.reply('You must need 1000 pokecoin(s) to make your pokemon mega!')
    else{
      if(mg && (message.content.toLowerCase().endsWith("mega") || message.content.toLowerCase().endsWith("mg"))){
        name = `mega-${mg.name.capitalize()}`
      }
      else if(mgy && args[0] == "y"){
        name = `mega-${mgy.name.toLowerCase().replace("-x","-y")}`.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ +/g, "-")
      }
      else if(mgx && args[0] == "x"){
        name = `mega-${mgy.name.toLowerCase().replace("-y","-x")}`.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase()).replace(/ +/g, "-")
      }
      else{
        if(message.content.endsWith("mega") || message.content.endsWith("mg")){
          return message.reply(`Incorrect format ❎. This pokemon can either become Mega ${name.toLowerCase().replace("mega-","").capitalize().replace(/-+/g, " ")} X or Mega ${name.toLowerCase().replace("mega-","").capitalize().replace(/-+/g, " ")} Y.`)
        }
        else {
          return message.reply(`Incorrect format ❎. This pokemon can only become Mega ${name.toLowerCase().replace("mega-","").capitalize().replace(/-+/g, " ")}.`)
        }
      }
      const newbal = user.balance - amount
      user.balance =newbal
      await user.save()
      user.pokemons[selected].name = name
      await User.findOneAndUpdate({ id: message.author.id}, {pokemons: user.pokemons}, { new: true});
      return client.embed(message.channel, undefined, undefined, `Successfully made your pokemon ${name.replace(/-+/g, " ").replace(/\b\w/g, l => l.toUpperCase())}.`);
    }
  }
}
