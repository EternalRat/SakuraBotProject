const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    var gif = [
        "https://media.giphy.com/media/mGAzm47irxEpG/giphy.gif",
        "https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif",
        "https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif",
        "https://media.giphy.com/media/Q1TXCgzvfLNbW/giphy.gif",
        "https://media.giphy.com/media/UuyMRM3Bazpcc/giphy.gif",
        "https://media.giphy.com/media/Z2sivLSfN8FH2/giphy.gif",
        "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
        "https://media.giphy.com/media/JynbO9pnGxPrO/giphy.gif",
        "https://media.giphy.com/media/WVmPDccubsdYQ/giphy.gif",
        "https://media.giphy.com/media/oTZW90AZ4KczC/giphy.gif",
        "https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif",
        "https://media.giphy.com/media/QweWddrIQxlfi/giphy.gif",
        "https://media.giphy.com/media/pwp1GytEM2NW0/giphy.gif",
        "https://media.giphy.com/media/sbzu6s3Chbr3y/giphy.gif",
        "https://media.giphy.com/media/YC4QEtFmz64sE/giphy.gif",
        "https://cdn.discordapp.com/attachments/469409545501016064/521029790585847828/B12g3TOPZ.gif",
    ]

    var phrase = [
        "It's full of love between them ! ",
        "What a beautiful kiss ! ",
        "Wow, I want one too ! ",
        "They're so lucky to kiss themself ! ",
        "They're so beautiful together ! ",
        "I'm jealous of them ! ",
    ]
    var alone = [
        "You're alone ? ",
        "You must be sad for kissing yourself .. ",
    ]

    pl = Math.floor(Math.random() * alone.length);
    pa = Math.floor(Math.random() * phrase.length);
    rk = Math.floor(Math.random() * gif.length);

    message.delete();
    if (message.mentions.users.first()) {
        let gifembed = new Discord.RichEmbed()
            .setDescription(`${message.author} is kissing ${message.mentions.users.first()} ` + phrase[pa] + ":heart_eyes:")
            .setImage(gif[rk])
            .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
        message.channel.send(gifembed);
    } else {
        let gifembed2 = new Discord.RichEmbed()
            .setDescription(`${message.author} is kissing ${message.author} ` + alone[pl] + ":cry:")
            .setImage(gif[rk])
            .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
        message.channel.send(gifembed2);
    }
}

module.exports.help = {
    name: "kiss",
}