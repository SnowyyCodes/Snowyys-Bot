const { MessageEmbed } = require("discord.js");
const { LOCALE } = require("../util/EvobotUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("List of All The Music Commands"))
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });
    //start of test

    let normalEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("List of All The Normal Commands"))
      .setColor("#F8AA2A");
      normalEmbed.addField("Random","Usage: S!random (min) (max)")
      normalEmbed.addField("Ur Gay","Damn :(")
      normalEmbed.addField("Kill", "Shuts the bot down")
      normalEmbed.addField("Members", "Displays the Member Count")



    //end of test
    helpEmbed.setTimestamp();
    message.reply("Sent you a dm :)")
    message.author.send(normalEmbed).catch(console.error);
    return message.author.send(helpEmbed).catch(console.error);

  }
};
