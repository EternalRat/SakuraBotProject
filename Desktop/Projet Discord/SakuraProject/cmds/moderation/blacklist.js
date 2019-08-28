const Discord = require("discord.js")
const fs = require("fs")
const blacklist = JSON.parse(fs.readFileSync("./cmds/security/blacklist.json"));

module.exports.run = async (bot, msg, args) => {
    if (msg.author.id === "291646942038196224" || "537272221375266818") {
        const target = args[0] || msg.mentions.users.first().id
        const reason = args.slice(1).join(" ")
        if (!blacklist[target]) {
            msg.channel.send("This user has been added to the blacklist")
            blacklist[target] = {
                reason: reason
            }
            setInterval(() => {
                fs.writeFile("./cmds/security/blacklist.json", JSON.stringify(blacklist), (err) => {
                    if (err) console.log(err)
                })
            }, 2000)
        } else {
            const filter = (reaction, user) => ["👍", "👎"].includes(reaction.emoji.name) && user.id === msg.author.id
            msg.channel.send("This user is already in the blacklist, do you want to remove it ? Use the current reaction bellow.").then(msg => {
                msg.react("👎")
                msg.react("👍")
                msg.awaitReactions(filter, {
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                }).then(async (collected) => {
                    const reaction = collected.first()

                    switch (reaction.emoji.name) {
                        case "👍":
                            var x
                            blacklist.forEach(target2 => {
                                var i
                                if (target2 != target) {
                                    i++
                                } else {
                                    x = i
                                }
                            })
                            delete blacklist[x]
                            msg.channel.send("This user has been removed from the blacklist.")
                            setInterval(() => {
                                fs.writeFile("./cmds/security/blacklist.json", JSON.stringify(blacklist), (err) => {
                                    if (err) console.log(err)
                                })
                            }, 2000)
                            break

                        case "👎":
                            msg.chanel.send("Okay boss.")
                            break
                    }
                })
            })
        }
    } else {
        msg.channel.send("You can't do this command ! You must contact the owner of the bots for add someone in the blacklist.")
    }
}

module.exports.help = {
    name: "blacklist",
    alias: "bl"
}