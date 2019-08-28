module.exports.run = async(bot,msg,args) => {
    bot.emit("guildMemberAdd", msg.member);
    bot.emit("guildMemberAdd", msg.member);
}

module.exports.help = {
    name: "test"
}