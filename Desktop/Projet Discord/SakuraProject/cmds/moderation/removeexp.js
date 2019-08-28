const SQLite = require("better-sqlite3");
const xp = SQLite('./exp.sqlite');

module.exports.run = async(bot, msg, args) => {
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("You're not an admin, you can't do that !");

    const user = msg.mentions.users.first() || bot.users.get(args[0]);
    if(!user) return msg.reply("You must mention someone or give their ID!");
  
    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) return msg.reply("You didn't tell me how many xp to give...")
  
    // Get their current points.
    let userscore = bot.getScore.get(user.id, msg.guild.id);
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
      userscore = { id: `${msg.guild.id}-${user.id}`, user: user.id, guild: msg.guild.id, xp: 0, level: 1 }
    }
    userscore.xp -= pointsToAdd;
  
    // We also want to update their level (but we won't notify them if it changes)
    let userLevel = Math.floor(0.1 * Math.sqrt(xp.xp));
    userscore.level = userLevel;
  
    // And we save it!
    bot.setScore.run(userscore);
  
    return msg.channel.send(`${msg.author.username} has remove ${pointsToAdd} xp to ${user.tag} and he now stands at ${userscore.xp} xp.`);
}

module.exports.help = {
    name: "remove"
}