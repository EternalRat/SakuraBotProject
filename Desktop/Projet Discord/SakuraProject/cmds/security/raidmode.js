const Discord = require("discord.js")
const fs = require("fs")
const raidmode = JSON.parse(fs.readFileSync("./json/raidmode.json"));

module.exports.run = async (bot, message, args) => {
    let guildID = message.guild.id
    let raidchannel = message.guild.channels.find("sakura-logs", "text")
    if (!message.member.hasPermission("ADMINISTRATOR") || message.author.id !== message.guild.ownerID) return message.channel.send("You can't do this!")
    if (!raidmode[guildID]) {
        raidmode[guildID] = {
            on: 1
        }
        if (raidchannel) {
            raidchannel.send("Raidmode has been activated by " + message.author.username)
        } else {
            message.channel.send("Raidmode has been activated by " + message.author.username)
        }

        setInterval(() => {
            fs.writeFile(`./json/raidmode.json`, JSON.stringify(raidmode), (err) => {
                if (err) console.log(err)
            })
        }, 1000);
    } else if (raidmode[guildID].on === 0) {
        raidmode[guildID] = {
            on: 1
        }
        if (raidchannel) {
            raidchannel.send("Raidmode has been activated by " + message.author.username)
        } else {
            message.channel.send("Raidmode has been activated by " + message.author.username)
        }

        setInterval(() => {
            fs.writeFile(`./json/raidmode.json`, JSON.stringify(raidmode), (err) => {
                if (err) console.log(err)
            })
        }, 1000);
    } else if (raidmode[guildID].on === 1) {
        raidmode[guildID] = {
            on: 0
        }

        if (raidchannel) {
            raidchannel.send("Raidmode has been desactivated by " + message.author.username)
        } else {
            message.channel.send("Raidmode has been desactivated by " + message.author.username)
        }

        setInterval(() => {
            fs.writeFile(`./json/raidmode.json`, JSON.stringify(raidmode), (err) => {
                if (err) console.log(err)
            })
        }, 1000);
    }
}

module.exports.help = {
    name: "raidmode"
}