const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    var gif = [
        "https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif",
        "https://media.giphy.com/media/ShAchOHe38Aak/giphy.gif",
        "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
        "https://media.giphy.com/media/LVZURY8imFufe/giphy.gif",
        "https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif",
        "https://media.giphy.com/media/LHIRwG1tytH20/giphy.gif",
        "https://media.giphy.com/media/C2RDSxHKGAfQI/giphy.gif",
        "https://media.giphy.com/media/dJhdsoECiBHxu/giphy.gif",
        "https://media.giphy.com/media/IvHvW0vPeIv6M/giphy.gif",
        "https://media.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif",
        "https://media.giphy.com/media/SYRN0yf7Bu4jm/giphy.gif",
        "https://media.giphy.com/media/u9BxQbM5bxvwY/giphy.gif",
        "https://media.tenor.com/images/a0255ad840bc7f700cf730519b966fdc/tenor.gif",
        "https://media.tenor.com/images/35fc88f417892fad929380ad78c796b9/tenor.gif",
        "https://media.tenor.com/images/60bca259cb36db34d4be16c5972a5bee/tenor.gif",
        "https://media.tenor.com/images/ac5a0c47918dece5e69c1cc9fbb416a9/tenor.gif",
        "https://media.tenor.com/images/cd050cf7190e8e6f50bebaea23a94c0f/tenor.gif",
        "https://media.tenor.com/images/24e1209fcf1db5ef7b9e9f04a3aaae33/tenor.gif",
        "https://media.tenor.com/images/8e868b88b9d82315e9f76b5f6e9ab4b6/tenor.gif",
        "https://media.tenor.com/images/834b104a7748ef6f2a15876c97fdbafa/tenor.gif",
        "https://media.tenor.com/images/bf12d07b7777edef5134d749ac781162/tenor.gif",
        "https://media.tenor.com/images/bc2051072c22e0952cc04e91e0018494/tenor.gif",
        "https://media.tenor.com/images/6bff4b147f43aaaca86421cfb09c9324/tenor.gif",
        "https://media.tenor.com/images/09e61136823abc8bcbc4d5da42aab775/tenor.gif",
        "https://cdn.discordapp.com/attachments/469409545501016064/521029291501420580/S1qhfy2cz.gif",
        "https://cdn.discordapp.com/attachments/469409545501016064/521029367435100170/H1Gx2aOvb.gif",
        "https://cdn.discordapp.com/attachments/469409545501016064/521029886681415690/SyaAd_7vW.gif",
        "https://cdn.weeb.sh/images/rkIK_u7Pb.gif",
        "https://cdn.weeb.sh/images/SywetdQvZ.gif",
    ]

    var phrase = [
        "It's full of love between them ! ",
        "What a beautiful hug ! ",
        "Wow, I want one too ! ",
        "They're so lucky to hug themself ! ",
        "They're so beautiful together ! ",
        "I'm jealous of them ! ",
    ]
    var alone = [
        "You're alone ? ",
        "You must be sad for hug yourself .. ",
    ]

    pl = Math.floor(Math.random() * alone.length);
    pa = Math.floor(Math.random() * phrase.length);
    rg = Math.floor(Math.random() * gif.length);

    message.delete();
    if(message.mentions.users.first()){
    let gifembed = new Discord.RichEmbed()
        .setDescription(`${message.author} has hugged ${message.mentions.users.first()} ` + phrase[pa] + ":heart_eyes:")
        .setImage(gif[rg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed);
    } else {
        let gifembed2 = new Discord.RichEmbed()
        .setDescription(`${message.author} has hugged ${message.author} ` + alone[pl] + ":cry:")
        .setImage(gif[rg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed2);
    }
}

module.exports.help = {
    name: "hug"
}