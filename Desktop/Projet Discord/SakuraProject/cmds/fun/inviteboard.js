const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!')
    });

    invites = invites.array()

    var x = 1

    let possibleinvites = []
    invites.forEach(function (invites) {
        possibleinvites.push(`-${x}- ${invites.inviter.username} ||  ${invites.uses} || ${invites.code} \n`)
        x = x + 1
    })

    const embed = new Discord.RichEmbed()
        .setTitle(`☆━━━━━━☆ **Leaderboard** ☆━━━━━━☆`)
        .setColor(0xCB5A5E)
        .addField('Invites', `\`\`${possibleinvites.join('\n')}\`\``)
        .setFooter(`Copyright - ${bot.user.username}`, bot.user.displayAvatarURL)
        .setTimestamp()
    message.channel.send(embed)
}

module.exports.help = {
    name: "inviteboard"
}