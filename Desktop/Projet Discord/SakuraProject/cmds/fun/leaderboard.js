const SQLite = require("better-sqlite3");
const Discord = require("discord.js")
const xp = SQLite('./exp.sqlite');

module.exports.run = async (bot, msg, args) => {
    const top10 = xp.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY xp DESC LIMIT 10;").all(msg.guild.id);
    const allxp = xp.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY xp DESC;").all(msg.guild.id)
    var x = 1
    var nb = 1
    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
        .setTitle("☆━━━━━━☆ **__Leaderboard__** ☆━━━━━━☆")
        .setDescription("**Our top 10 xp leades**")
        .setColor(0x00AE86)

    for (const data of top10) {
        embed.addField(nb + " - " + bot.users.get(data.user).tag, `${data.xp} xp (level ${data.level})`);
        if (bot.users.get(data.user).id != msg.author.id) {
            x = x + 1
        } else {
            embed.setFooter(`Rank : ${x}/${allxp.length} - XP : ${data.xp}`)
        }
        nb++
    }
    msg.channel.send(embed);
}

module.exports.help = {
    name: "leaderboard"
}