const Discord = require('discord.js')
const { get } = require('request-promise-native');
const { classToPlain } = require("class-transformer");
const User = require('../../models/user.js')
let client = new Discord.Client()


module.exports = {
  name: "gamble",
  description: "gamble with a user",
  category: "Economy",
  args: true,
  usage: ["bet <user> <amount>"],
  cooldown: 3,
  permissions: [],
  aliases: ["bet"],
  execute: async (client, message, args, prefix, guild, color, channel) => {
    let sender = message.author
    let senderx = await User.findOne({id: message.author.id})
    if(!senderx) return message.channel.send("You haven't started yet!")
let user = message.mentions.users.first()
let userx = await User.findOne({id: user.id})
if (!user) return message.channel.send(`Mentioned user did not start yet!`)

let money = senderx.balance
let money2 = userx.balance


let wins = ["win", "lose"]
   let win = wins[Math.floor(Math.random() * wins.length)];
if (!args[1]) {
   return message.channel.send("Tell the amount to gamble!")
} if (args[1] > money) {
  return message.channel.send(`You don't have that much balance`)
} if (args[1] > money2) {
  return message.channel.send(`That user don't have that much balance`)
} if (isNaN(args[1])) {
    return message.channel.send(`Thats not a valid number`)
     } else try {
      var playingMessage = await message.channel.send(`${user}, ${sender.username} has invited you in **${args[1]}** coins gamble. accept or reject it!`);
      await playingMessage.react("✅");
      await playingMessage.react("❌")
  } catch (error) {
      console.error(error);
      return message.channel.send("Error: Try again.")
    }
    
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = playingMessage.createReactionCollector(filter, {
      time: 45000
      });

      collector.on("collect", async (reaction, user) => {

      switch (reaction.emoji.name) {
        case "✅":
         reaction.users.remove(user).catch(console.error);
         if (user !== message.mentions.users.first()) return;
         playingMessage.reactions.removeAll()
     {
    if (win === "win") {
     message.channel.send(`You joined ${sender.username}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${sender} won **${args[1]}** craft coins!`)
},2000)
senderx.balance = senderx.balance + parseInt(args[1])
userx.balance = userx.balance - parseInt(args[1])
 userx.save()
 senderx.save()
})
   } else if (win === "lose") {
    message.channel.send(`You joined ${sender.username}'s gamble!`).then(msg =>{
setTimeout(async function(){
  await msg.edit(`${user} won **${args[1]}** craft  coins!`)
  userx.balance = userx.balance + parseInt(args[1])
  senderx.balance = senderx.balance - parseInt(args[1])
   userx.save()
   senderx.save()
},2000)
})
    }
  }

          collector.stop();
         
          break;

        case "❌": {
          reaction.users.remove(user).catch(console.error);
          if (user !== message.mentions.users.first()) return;
          playingMessage.reactions.removeAll()
          message.channel.send(`Gamble request declined!`)
        }
          collector.stop();
          break;
        
        default:
          reaction.users.remove(user).catch(console.error);
          break;
          playingMessage.reactions.removeAll()
      } 
    })
  }
}; 