module.exports = {
  name: "disconnect",
  description: "Disconnects the bot",
  cooldown: 10,
  execute(message) {
    message
    message.reply("I have left, Thanks for listening!")
    message.guild.me.voice.channel.leave()
  }
};
