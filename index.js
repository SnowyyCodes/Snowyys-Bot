/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX, LOCALE } = require("./util/EvobotUtil");
const path = require("path");
const i18n = require("i18n");

const client = new Client({ 
  disableMentions: "everyone",
  restTimeOffset: 0
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

i18n.configure({
  locales: ["en", "es", "ko", "fr", "tr", "pt_br", "zh_cn", "zh_tw"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  objectNotation: true,
  register: global,

  logWarnFn: function (msg) {
    console.log("warn", msg);
  },

  logErrorFn: function (msg) {
    console.log("error", msg);
  },

  missingKeyFn: function (locale, value) {
    return value;
  },

  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity("And Doing as Snowyy Says", { type: 'WATCHING' });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(i18n.__("common.errorCommend")).catch(console.error);
  }
});



//Start of Consts
const SnowyyID = "766035494554828801";



//End of Consts


// Start of commands
client.on('message', msg=>{
    const prefix = "S!";
        let args = msg.content.substring(prefix.length).split(" ");

        switch(args[0]){
            case 'no-one-asked':
                msg.channel.bulkDelete('1')
                msg.channel.send('dont think anyone asked for that ' + (args[1]));
            break;
        }
})



client.on('message', msg=>{
    const prefix = "S!";
        let args = msg.content.substring(prefix.length).split(" ");

        switch(args[0]){
            case 'random':
             const result = Math.random() * (args[2] - args[1]) + args[2];
             msg.channel.send(result)
            break;
        }
})



client.on('message', msg=>{
    const prefix = "S!";
        let args = msg.content.substring(prefix.length).split(" ");

        switch(args[0]){
            case 'kill':
             msg.channel.send("no<3")
            break;
        }
})

client.on('message', msg=>{
    if(msg.content === ("S!ur gay")){
    msg.channel.send("damn.")
    }
})

client.on('message', msg=>{
    if(msg.content === ("S!members")){
    targetGuild = client.guilds.cache.get('800157117620551720')
    msg.channel.send('This server has ' + targetGuild.memberCount + ' amazing members!')
    }
})


client.on('message', msg=>{
    if(msg.content === ("")){

    }
})



client.on('message', msg=>{
    const prefix = "S!";
        let args = msg.content.substring(prefix.length).split(" ");

        switch(args[0]){
            case 'ticket':
                switch(args[1]){
                case 'create':
                let name = msg.author.username;
                let server = msg.guild;
                server.channels.create(name, "text")
                .then(r => {
                r.overwritePermissions(msg.author.id, { VIEW_CHANNEL: true });
                r.overwritePermissions(client.id, { VIEW_CHANNEL: true });
                r.overwritePermissions(812130595974676492, { VIEW_CHANNEL: false });
    })



                break;
            }
             switch(args[1]){
                case 'delete': 
                if(msg.author.id == SnowyyID ){
                    msg.channel.delete()
                }
                else{
                    msg.channel.send("You are not Snowyy. Please contact Snowyy if you are attempting to close this ticket")
                }



            break;
        }

            


            break;
        }
})


//End Of Commands 



// Start of AutoDetect

client.on('message', msg=>{
    if(msg.content.includes("sus")){
    if(!msg.author.bot){
    msg.reply("hahaha so sussy sus sussy")
    msg.channel.send({files: ["./assets/sus.gif"]})
    }
    else{
        return;
    }
    }
})