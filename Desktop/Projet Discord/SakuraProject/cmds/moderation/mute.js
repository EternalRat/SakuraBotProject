const Discord = require("discord.js")
const fs = require("fs")
const botSettings = require("../json/botSettings.json")
const prefix = botSettings.prefix
module.exports.run = async(bot,msg,args) => {
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return
    let target = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0])
    var embedColor = '#ffffff'
    var missingArgsEmbed = new Discord.RichEmbed()
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setTitle('Missing Arguments!')
        .setDescription('Usage: `' + prefix + 'mute [@User] delay in seconds')
        .setTimestamp();
    if (!target) return msg.channel.send(missingArgsEmbed)
    msg.delete().catch()
    let role = msg.guild.roles.find(r => r.name === "Muted");
    if (!role) {
        try {
            role = await msg.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });

            msg.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    if(target.roles.has(role.id)) return msg.author.send("This user is already mute")
    bot.mutes[target.id] = {
        guild: msg.guild.id,
        time: Date.now() + parseInt(args[1]) * 1000
    }
    await target.addRole(role);

    fs.writeFile("./json/mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
        if (err) throw err;
        msg.channel.send(`${target} has been muted by ${msg.author}`);
    })
}

module.exports.help = {
    name: "mute"
}