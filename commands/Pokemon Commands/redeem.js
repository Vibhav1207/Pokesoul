const Discord = require("discord.js");

const { MessageEmbed, MessageCollector, Collection } = require("discord.js");

const { get } = require('request-promise-native');

const User = require('../../models/user.js');

const Spawn = require('../../models/spawn.js');

const Guild = require('../../models/guild.js');

const Pokemon = require("../../Classes/Pokemon.js");

const { classToPlain } = require("class-transformer");

const Galar = require('../../db/galarians.js');
const shadow = require('../../db/shadow.js');
                       
                     
                       
                      
let gen8 = require('../../db/gen8.js')

const ms = require("ms");

const { capitalize, getlength } = require('../../functions.js');
 const Canvas = require('canvas')
 const canvas = Canvas.createCanvas(1192,670);
          const ctx = canvas.getContext('2d')


module.exports = {
  name: "redeem",
  description: "Redeems pokemon or credits",
  category: "Pokemon Commands",
  args: false,
  usage: ["redeem"],
  cooldown: 3,
  permissions: [],
  aliases: ["deem"],
   












execute: async (client, message, args, prefix, guild, color, channel) => {
    if (message.content.toLowerCase().startsWith((`${prefix.toLowerCase()}r add` || `${prefix.toLowerCase()}r remove`))) return;

    let user = await User.findOne({ id: message.author.id });

    if (!user || !user.pokemons[0]) return message.channel.send("You need to pick a starter pokémon using the \`" + prefix + "start\` command before using this command!");


    let embed = new MessageEmbed()
      .setAuthor(`Your Redeems: ${user.redeems}`)
      .addField(`∙redeem pokemon <Pokemon Name>`, 'Redeem any Pokemon of your choice with random stats.')
      .addField(`redeem spawn <Pokemon Name>`, 'Redeem Spawn any Pokemon of your choice with random stats.')
      .addField(`redeem cc`, 'Claim 25000 craft coins for your Redeem.')
      .setColor(color)
      .setFooter("Redeem once used wont be refunded. Be careful while using them. You cannot directly Redeem shinies.")


    let embed2 = new MessageEmbed()
      .setDescription(`Congratulations ${message.author}! You have used your Redeem and claimed 25000 craft coins aka cc.`)
      .setFooter(`Redeems Left: ${user.redeems - 1} `)
      .setColor(color)

    if (!args[0]) return message.channel.send(embed);
    if (args[0].toLowerCase() == "cc") {
      if (user.redeems <= 0) return message.channel.send("You don't have enough Redeems.");
      user.balance = user.balance + 25000;
      user.redeems = user.redeems - 1;
      await user.save();
      return message.channel.send(embed2)
    }
else if(args[0].toLowerCase() === "pokemon"){
   if (user.redeems <= 0) return message.channel.send("You don't have enough Redeems.");
      user.redeems = user.redeems - 1;
      if (!args[1]) return message.channel.send(`No Pokemon Name Received.\`${prefix}redeem get <pokemon>\``)
      if (!isNaN(args[1])) return message.channel.send("You cannot redeem Pokemons using Integers!");

      const Name = args.slice(1).join('-')
      let name = Name
      let url;

      var gene8 = gen8.find(r => r.name === name);
      var shad = shadow.find(r => r.name === name.toLowerCase().replace("shadow-", ""));
      var gg = Galar.find(r => r.name === name.toLowerCase().replace("galarian-", ""));

      if (gg) {
        url = gg.url;
        let lvl = Math.floor(Math.random() * 50)
        let poke = new Pokemon({ name: Name, url: url }, lvl);
        poke = await classToPlain(poke);
        let embed2 = new MessageEmbed()
        .setDescription(`Congratulations ${message.author}! You have used your Redeem and claimed a **${capitalize(name).replace("-"," ")}** (${poke.totalIV}% IV).`)
        .setFooter(`Redeems Left: ${user.redeems - 1} `)
        .setColor(color)
        let msg = await message.channel.send(`Confirm to Redeem a **${capitalize(name).replace("-"," ")}**? (y/N)`);
        const collector = msg.channel.createMessageCollector(m => ["yes", "no", "y", "n"].includes(m.content.toLowerCase()) && user.id === message.author.id, { time: 30000 });

        collector.on('collect', async (collected) => {
          if (collected.content.toLowerCase() === "yes" || collected.content.toLowerCase() === "y") {
            await user2.pokemons.push(poke);
            await user2.save();
            collector.stop();
            return message.channel.send(embed2)
          }
          if (collected.content.toLowerCase() === "no" || collected.content.toLowerCase() === "n") {
            collector.stop();
            return message.channel.send("Ok Cancelled!");
          }
        });
        collector.on('end', collected => {
          return msg.reactions.removeAll();
        });
      }
      
      else if (gene8) {
        url = gene8.url;
        let lvl = Math.floor(Math.random() * 50)
        let poke = new Pokemon({ name: Name, url: url }, lvl);
        poke = await classToPlain(poke);
        let embed2 = new MessageEmbed()
        .setDescription(`Congratulations ${message.author}! You have used your Redeem and claimed a **${capitalize(name).replace("-"," ")}** (${poke.totalIV}% IV).`)
    
        .setColor(color)
        let msg = await message.channel.send(`Confirm to Redeem a **${capitalize(name).replace("-"," ")}**? (y/N)`);
        const collector = msg.channel.createMessageCollector(m => ["yes", "no", "y", "n"].includes(m.content.toLowerCase()) && user.id === message.author.id, { time: 30000 });

        collector.on('collect', async (collected) => {
          if (collected.content.toLowerCase() === "yes" || collected.content.toLowerCase() === "y") {
            await user2.pokemons.push(poke);
            await user2.save();
            collector.stop();
            return message.channel.send(embed2)
          }
          if (collected.content.toLowerCase() === "no" || collected.content.toLowerCase() === "n") {
            collector.stop();
            return message.channel.send("Ok Cancelled!");
          }
        });
        collector.on('end', collected => {
          return msg.reactions.removeAll();
        });
      }
      else{
        return;
      }
    }

    if (args[0].toLowerCase() == "spawn" || "s") {

      if (user.redeems <= 0) return message.channel.send("You don't have enough Redeems.");
      user.redeems = user.redeems - 1;
      if (!args[1]) return;
      if (!isNaN(args[1])) return message.channel.send("That pokémon doesn't seem to exist or maybe you spelled it wrong?");

      let name = args[1].toLowerCase();
      let Name = name;
      if (name.startsWith("galarian")) {
        name = name.replace("galarian-", "");
        var galarian = Galar.find(r => r.name.toLowerCase() === name.toLowerCase());
      };


      if (galarian) {
        url = galarian.url;
        let lvl = Math.floor(Math.random() * 50)
        let poke = new Pokemon({ name: Name, url: url }, lvl);
        poke = await classToPlain(poke);
        let spawn = await Spawn.findOne({ id: message.channel.id });
        if (!spawn) await new Spawn({ id: message.channel.id }).save();
        spawn = await Spawn.findOne({ id: message.channel.id })
        spawn.pokemon = []
        spawn.pokemon.push(poke)
        spawn.time = Date.now() + 259200000
        await spawn.save()
     let bg = "https://cdn.discordapp.com/attachments/844390398687707157/845875885865041930/mike-blank-JWa5jZ1LkJY-unsplash.jpg";
        
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(poke.url)
          ctx.drawImage(pk,300,100,550,550)
        const embed3 = new MessageEmbed()
            .setAuthor(`A Wild Pokémon has appeared!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
            .setColor(color)
     
        // user.redeems = user.redeems - 1
        await user.save();
        return message.channel.send(embed3)
      }

      else {
        const Name = args[1].toLowerCase();
        let name = Name;
        let url;
        var findGen8 = gen8.find(r => r.name === name);
        if (findGen8) {
          url = findGen8.url;
          let lvl = Math.floor(Math.random() * 50)
          let poke = new Pokemon({ name: Name, url: url }, lvl);
          poke = await classToPlain(poke);
          let spawn = await Spawn.findOne({ id: message.channel.id });
          if (!spawn) await new Spawn({ id: message.channel.id }).save();
          spawn = await Spawn.findOne({ id: message.channel.id })
          spawn.pokemon = []
          spawn.pokemon.push(poke)
          spawn.time = Date.now() + 259200000
          await spawn.save()
         let bg = "https://cdn.discordapp.com/attachments/844390398687707157/845875885865041930/mike-blank-JWa5jZ1LkJY-unsplash.jpg";
        
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(poke.url)
          ctx.drawImage(pk,300,100,550,550)
        const embed3 = new MessageEmbed()
            .setAuthor(`A Wild Pokémon has appeared!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
            .setColor(color)
           
          // user.redeems = user.redeems - 1

          await user.save();
          return message.channel.send(embed3)

        }
        else if (!findGen8) {
          const options = {
            url: `https://pokeapi.co/api/v2/pokemon/${Name}`,
            json: true
          };
          if (name.toLowerCase().startsWith("giratina")) options.url = "https://pokeapi.co/api/v2/pokemon/giratina-altered";
          if (name.toLowerCase().startsWith("deoxys")) options.url = "https://pokeapi.co/api/v2/pokemon/deoxys-normal";
          if (name.toLowerCase().startsWith("shaymin")) options.url = "https://pokeapi.co/api/v2/pokemon/shaymin-land";
          if (name.toLowerCase().startsWith("nidoran-m")) options.url = "https://pokeapi.co/api/v2/pokemon/nidoran-m";
          if (name.toLowerCase().startsWith("nidoran-f")) options.url = "https://pokeapi.co/api/v2/pokemon/nidoran-f";
          if (name.toLowerCase().startsWith(("porygon z") || "porygon-z")) options.url = "https://pokeapi.co/api/v2/pokemon/porygon-z";
          if (name.toLowerCase().startsWith("landorus")) options.url = "https://pokeapi.co/api/v2/pokemon/landorus-incarnate";
          if (name.toLowerCase().startsWith("thundurus")) options.url = "https://pokeapi.co/api/v2/pokemon/thunduru-incarnate";
          if (name.toLowerCase().startsWith("tornadus")) options.url = "https://pokeapi.co/api/v2/pokemon/tornadus-incarnate";
          if (name.toLowerCase().startsWith("mr.mime")) options.url = "https://pokeapi.co/api/v2/pokemon/mr-rime";
          if (name.toLowerCase().startsWith("pumpkaboo")) options.url = "https://pokeapi.co/api/v2/pokemon/pumpkaboo-average";
          if (name.toLowerCase().startsWith("meowstic")) options.url = "https://pokeapi.co/api/v2/pokemon/meowstic-male";
          if (name.toLowerCase().startsWith("toxtricity")) options.url = "https://pokeapi.co/api/v2/pokemon/toxtricity-amped";
          if (name.toLowerCase().startsWith("mimikyu")) options.url = "https://pokeapi.co/api/v2/pokemon/mimikyu-disguised  ";

          await get(options).then(async t => {
            let check = t.id.toString().length



            if (check === 1) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${t.id}.png`
            } else if (check === 2) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${t.id}.png`
            } else if (check === 3) {
              url = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${t.id}.png`
            }

            console.log(t.types.map(r => r.type.name).join(", "))

            let lvl = Math.floor(Math.random() * 50)
            let poke = new Pokemon({ name: Name, id: t.id, url: url }, lvl);
            poke = await classToPlain(poke);
            let spawn = await Spawn.findOne({ id: message.channel.id });
            if (!spawn) await new Spawn({ id: message.channel.id }).save();
            spawn = await Spawn.findOne({ id: message.channel.id })
            spawn.pokemon = []
            spawn.pokemon.push(poke)
            spawn.time = Date.now() + 259200000
            await spawn.save()

let bg = "https://cdn.discordapp.com/attachments/844390398687707157/845875885865041930/mike-blank-JWa5jZ1LkJY-unsplash.jpg";
        
          const background = await Canvas.loadImage(bg)
          ctx.drawImage(background,0,0,canvas.width,canvas.height)
          const pk = await Canvas.loadImage(poke.url)
          ctx.drawImage(pk,300,100,550,550)
        const embed3 = new MessageEmbed()
            .setAuthor(`A Wild Pokémon has appeared!`)
            .setDescription(`Guess the Pokémon аnd type \`${guild.prefix}catch <pokémon name>\` to cаtch it!`)
             .attachFiles([{ name: "new.png", attachment: canvas.toBuffer() }])
            .setImage("attachment://" + "new.png")
            .setColor(color)
 
            await user.save();
            return message.channel.send(embed3)

          }).catch(err => {
            if (err.message.includes(`404 - "Not Found"`)) return message.channel.send(`That pokémon doesn't seem to exist or maybe you spelled it wrong?`);

          });
        }
      }
    }
  }
}
 