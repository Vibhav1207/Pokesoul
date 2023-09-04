module.exports = {
    footer: () => {
        let array = require("fs").readFileSync("./db/tips.txt").toString().trim().split("\n").map(r => r.trim());
        return array[Math.floor(Math.random() * array.length)]
    },
    logChannel: "1143560887832170546",
    bugchannelid: "1143560887832170546",
    feedbackchannelid: "1143560887832170546",
    tradechannelid: "1143560887832170546",
    suggestionchannelid: "1143560887832170546",

    token: "MTEzNTYyNDYyNjk1Mzc4MTUxOQ.GC5t9d.QUllvMpj_q3mI6efTmhXEjfJdEaMWP-yjhhx-I",
    prefix: "p!",

    banAppeal: "",
       owners: ["721308731010449468","778911797054930955","1021829409705037855","620947358355554304","716936768192118955","592949366881255436"],


   
    asliMalik: ["1021829409705037855"],
    dbdevs: ["1021829409705037855"],
   
  mongo_atlas: {

       username: "vibhav07patel",

       password: "gqKBLkeYNlkUFV5E",

       cluster: "cluster0",

      shard: {

        one: "cluster0-shard-00-00.0knyp.mongodb.net:27017",

           two: "cluster0-shard-00-02.0knyp.mongodb.net:27017",

           three: "cluster0-shard-00-03.0knyp.mongodb.net:27017"

       }
    },
    webhooks: {
        cmd: {
            ID: "879930450288721980",
            Token: "bjPpJplKuC36xk5Kz-AQBwyOTH4Ca54HTRkZu3uRJmUdLODtwexUyPkaumPBwQjOe6yE"
        },
        guild: {
            ID: "879930450288721980",
            Token: "bjPpJplKuC36xk5Kz-AQBwyOTH4Ca54HTRkZu3uRJmUdLODtwexUyPkaumPBwQjOe6yE"
        }
    },
    dbl: {
        authorization: 
     "thisisasocalledauthtokenbro"
        //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0MDU3OTE0NDUyNTAyMTE4NSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI3NTI3OTAzfQ.sFSBUxukmpQ07V-UZDtbOaddKd2gUn29zy5PUcYuaeM"
    },
    cooldown: 3000
}

    // token: "ODEwNzQ0NTc0OTIxODAxNzY5.YCoGuQ.jG098wVM2LSTvE9fd39Ej1WvepE",
