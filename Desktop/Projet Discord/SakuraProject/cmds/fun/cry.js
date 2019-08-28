const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {

    let target = message.mentions.users.first()

    var gif = [
        "https://cdn.weeb.sh/images/rkpoLqadG.gif",
        "https://cdn.weeb.sh/images/BkoBX8mwW.gif",
        "https://cdn.weeb.sh/images/BJf41e51z.gif",
        "https://cdn.weeb.sh/images/rJXwmLQv-.jpeg",
        "https://cdn.weeb.sh/images/HJZX78Xw-.gif",
        "https://cdn.weeb.sh/images/rJ5IX8XPZ.gif",
        "https://cdn.weeb.sh/images/ryVBX8mw-.gif",
        "https://cdn.weeb.sh/images/H1tfQI7wZ.gif",
        "https://cdn.weeb.sh/images/r1O8QUmvb.gif",
        "https://cdn.weeb.sh/images/SJ08mUXwZ.gif",
        "https://cdn.weeb.sh/images/Sy1EUa-Zz.gif",
        "https://cdn.weeb.sh/images/Syzw78XPZ.gif",
        "https://cdn.weeb.sh/images/B1YmXLmD-.gif",
        "https://cdn.weeb.sh/images/r1OCr1hqM.gif",
        "https://cdn.weeb.sh/images/ryxKX7L7P-.gif",
        "https://cdn.weeb.sh/images/rJUbkgqyf.gif",
        "https://cdn.weeb.sh/images/SJRW7U7DZ.gif",
        "https://cdn.weeb.sh/images/r1OUjlycZ.gif",
        "https://cdn.weeb.sh/images/H16Wkl5yf.gif",
        "https://cdn.weeb.sh/images/Hk6EmLmDZ.gif",
        "https://cdn.weeb.sh/images/ryi8787vW.gif",
        "https://cdn.weeb.sh/images/SJ-11x5kz.gif",
        "https://cdn.weeb.sh/images/SkbN7LQv-.gif",
        "https://cdn.weeb.sh/images/ByF7REgdf.gif",
        "https://cdn.weeb.sh/images/H1nGQ8Qw-.gif",
        "https://cdn.weeb.sh/images/r1UGQLXvb.gif",
        "https://cdn.weeb.sh/images/Hy4QmU7PZ.gif",
    ]

    var phrase = [
        
    ]

    pa = Math.floor(Math.random() * phrase.length);
    rg = Math.floor(Math.random() * gif.length);

    message.delete();
    if(target){
    let gifembed = new Discord.RichEmbed()
        .setDescription(`Awww look, ${target.username} you made ${message.author.username} sad :cry:`)
        .setImage(gif[rg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed);
    } else {
        let gifembed2 = new Discord.RichEmbed()
        .setDescription(`Awww look, ${message.author.username} is sad :cry:`)
        .setImage(gif[rg])
        .setFooter(`Powered by ${bot.user.username}`, bot.user.displayAvatarURL)
    message.channel.send(gifembed2);
    }
}

module.exports.help = {
    name: "cry"
}