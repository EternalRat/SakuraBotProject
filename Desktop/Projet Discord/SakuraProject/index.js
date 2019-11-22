const Discord = require("discord.js")
const bot = new Discord.Client()
const botSettings = require("./cmds/json/botSettings.json")
const prefix = botSettings.prefix, token = botSettings.Token
const fs = require("fs")
const blacklist = JSON.parse(fs.readFileSync("./cmds/security/blacklist.json"))
const Canvas = require("canvas")

const SQLite = require("better-sqlite3");
const xp = new SQLite('./exp.sqlite');

let joinChainMembers = []
var joinChainStartedAt = 0

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()
bot.mutes = require("./json/mutes.json")
global.servers = {}

const raidmode = JSON.parse(fs.readFileSync("./json/raidmode.json", "utf8"))

//lecture des fichiers commandes
fs.readdir('./cmds', (err, files) => {
    if (err) return console.log(`err while reading ./cmds`)
    files.forEach((folder) => {
        fs.readdir(`./cmds/${folder}`, (err, files) => {
            if (err) return console.log(`err while reading ./cmds/${folder}`)
            var failed = 0

            files.filter(f => f.split(".").pop() === "js").forEach((file, i) => {
                try {
                    let props = require(`./cmds/${folder}/${file}`)
                    console.log(`${i + 1}: ${file} loaded!`)
                    bot.commands.set(props.help.name, props)
                    bot.commands.set(props.help.alias, props)
                } catch (e) {
                    console.log(`unable to load ./cmds/${folder}/${file}`)
                    console.log(e)
                    failed++
                }
            })
            console.log(`found ${files.length} commands in ${folder}, loaded ${files.length - failed}`)
        })
    })
})

bot.on("ready", async () => {
    var server
    if (bot.guilds.size = 1) {
        var server = "server"
    } else {
        server = "servers"
    }
    bot.user.setActivity(`${prefix}help | ${bot.guilds.size} ${server}`)

    //mute temporaire interval
    bot.setInterval(() => {
        for (let i in bot.mutes) {
            let time = bot.mutes[i].time
            let guildID = bot.mutes[i].guild
            let guild = bot.guilds.get(guildID)
            let member = guild.members.get(i)
            let mutedRole = guild.roles.find(r => r.name === "Muted")
            if (!mutedRole) continue
            if (Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`)
                member.removeRole(mutedRole)
                delete bot.mutes[i]
                fs.writeFile("./json/mutes.json", JSON.stringify(bot.mutes), err => {
                    if (err) throw err
                    console.log(`I have unmuted ${member.user.tag}.`)
                })
            }
        }
    }, 5000)

    const table = xp.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {
        xp.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER);").run();
        xp.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        xp.pragma("synchronous = 1");
        xp.pragma("journal_mode = wal")
    }

    bot.getScore = xp.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    bot.setScore = xp.prepare("INSERT OR REPLACE INTO scores (id, user, guild, xp, level) VALUES (@id, @user, @guild, @xp, @level);");

})

bot.on("guildCreate", async guild => {
    let guildID = guild.id
    if (!raidmode[guildID]) {
        raidmode[guildID] = {
            on: 0
        }
    }

    guild.createChannel("sakura-logs", "text", [{
        id: guild.id,
        deny: "VIEW_CHANNEL"
    }])
})

bot.on("guildDelete", async guild => {
    guild.channels.find("name", "sakura-logs").delete()
})

bot.on('messageDelete', async (message) => {
    if (message.author.id === "593409768568258611") return
    const logs = message.guild.channels.find('name', 'logs-report')
    if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
        await message.guild.createChannel('logs-report', 'text')
    } else if (!logs) {
        return console.log('The logs channel does not exist and cannot be created')
    }
    const entry = await message.guild.fetchAuditLogs({
        type: 'MESSAGE_DELETE'
    }).then(audit => audit.entries.first())
    let user
    if (entry.extra.channel === message.channel && (entry.target.id === message.author.id) && (entry.createdTimestamp > (Date.now() - 5000)) && (entry.extra.count >= 1)) {
        user = entry.executor.username
    } else {
        user = message.author
    }
    if (logs) {
        const logembed = new Discord.RichEmbed()
            .setTitle('Message Deleted')
            .setAuthor(user.tag, message.author.displayAvatarURL)
            .addField(`**Message sent by ${message.author.username} has been deleted in ${message.channel.name}**`, message.content)
            .setColor("#FF0000")
            .setFooter(`#${message.channel.name}`)
            .setTimestamp()
        logs.send(logembed)
    }
})

bot.on('messageUpdate', async (oldMessage, newMessage) => {

    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        var log = newMessage.guild.channels.find('name', "logs")
        if (log != null) {
            const logembed = new Discord.RichEmbed()
                .setTitle('Message updated')
                .setAuthor(newMessage.author.username, newMessage.author.displayAvatarURL)
                .setDescription(`**Message sent by ${newMessage.author.username} has been updated in ${newMessage.channel.name}**`)
                .addField("Before :", oldMessage.cleanContent)
                .addField("After :", newMessage.cleanContent)
                .setColor("#FF0000")
                .setThumbnail(bot.user.avatarURL)
                .setFooter(`#${newMessage.channel.name}`)
                .setTimestamp()
            log.send(logembed)
        }
    }
})

bot.on('guildBanAdd', async (guild, user) => {
    var log = guild.channels.find('name', "logs")
    let ban = new Discord.RichEmbed()
        .setDescription(`🔨**Banned ${user.tag}** _(ID : ${user.id}_)\n`)
    if (log != null) {
        log.send(ban)
    }
})

bot.on('guildBanRemove', async (guild, user) => {
    var log = guild.channels.find('name', "logs")
    let unban = new Discord.RichEmbed()
        .setDescription(`🔓**Unbanned ${user.tag}** _(ID : ${user.id}_)\n`)
    if (log != null) {
        log.send(unban)
    }
})

bot.on("guildMemberRemove", async (member) => {
    if (member.guild.id === "598211426347384862") {
        bot.channels.get("616320839859568660").setName(`User Count : ${member.guild.members.filter(m => !m.user.bot).size}`)
    }

    bot.deleteScore = xp.prepare(`DELETE FROM scores WHERE user = ${member.user.id} AND guild = ?`)
    console.log("Data erased")
})

bot.on("guildMemberAdd", async (member, guild) => {

    if (raidmode[member.guild.id].on === 1) {
        member.send("Sorry the raidmode has been activated, come back later !")
        setInterval(() => {
            member.kick()
        }, 1000)
    } else if (!raidmode[member.guild.id] || raidmode[member.guild.id].on === 0) {
        const canvas = Canvas.createCanvas(700, 250)
        const ctx = canvas.getContext('2d')
        const background = await Canvas.loadImage("./cmds/fun/card.png")
        var number
        const prec = member.guild.members.filter(m => !m.user.bot).size
        if (prec >= 1000000000) {
            number = (prec / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        } else if (prec >= 1000000) {
            number = (prec / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (prec >= 1000) {
            number = (prec / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else if (prec <= 1000) {
            number = prec
        }
        var username
        const authorx = member.user.username
        if (authorx.length > 10) {
            username = authorx.slice(0, 7) + "..."
        }
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        ctx.font = '20px sans-serif'
        ctx.fillStyle = '#fde2c3'
        ctx.fillText(`Welcome ${username}`, 250, 200)
        ctx.fillText(`We are now ${number} on the server`, 215, 230)
        ctx.beginPath()
        ctx.arc(350, 100, 75, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()

        var image;
        if (!member.avatarURL) {
            image = bot.user.avatarURL
        } else {
            image = member.avatarURL
        }

        const avatar = await Canvas.loadImage(image)
        ctx.drawImage(avatar, 265, 0, 175, 200)
        const attachment = new Discord.Attachment(canvas.toBuffer(), "./cmds/fun/card.png")

        bot.channels.get("522415559627767808").send(attachment)
    }

    if (blacklist[member.user.id]) {
        member.guild.owner.send("Be careful ! A blacklisted person has been added to your server ! Here is his name : " + member.user.tag + "\nFor having more information about the reason why he is in the blacklist type s!checkid with his id")
    }

    setInterval(() => {

    });
    joinChainStartedAt = member.joinedTimestamp
    joinChainMembers.push(member.user.id)
    if ((joinChainStartedAt - member.joinedTimestamp) < 3) {
        if (joinChainMembers.length >= 5) {
            for (var i = 0; i < joinChainMembers.length; i++) {
                member.guild.members.get(joinChainMembers[i]).kick("RAID")
            }
            if (i = joinChainMembers.length) {
                joinChainMembers = []
                joinChainStartedAt = 0
                raidmode[member.guild.id] = {
                    on: 1
                }
                member.guild.owner.send("Un raid a été évité et l'antiraid a été activé !")
                setInterval(() => {
                    fs.writeFile(`./json/raidmode.json`, JSON.stringify(raidmode), (err) => {
                        if (err) console.log(err)
                    })
                }, 1000);
            }
        }
    } else {
        joinChainStartedAt = member.user.joinedTimestamp
    }

    if (member.guild.id === "598211426347384862") {
        bot.channels.get("616320839859568660").setName(`User Count : ${member.guild.members.filter(m => !m.user.bot).size}`)
    }
})

bot.on('guildMemberUpdate', function (oldMember, newMember) {

    var Changes = {
        unknown: 0,
        nickname: 4
    }
    var change = Changes.unknown;
    if (newMember.nickname != oldMember.nickname) {
        change = Changes.nickname
    }

    let nicknamechange = new Discord.RichEmbed()
        .setTitle("[Changed Nickname]")
        .setDescription(`**${newMember}**`)
        .setColor("RANDOM")
        .addField("Before :", oldMember.nickname)
        .addField("After :", newMember.nickname)
        .setThumbnail(bot.user.avatarURL)
        .setTimestamp()

    var log = newMember.guild.channels.find('name', "sakura-logs")
    if (log != null) {
        switch (change) {
            case Changes.nickname:
                log.send(nicknamechange)
                break;
        }
    }
})

bot.on("message", async message => {

    if (message.author.bot) return
    if (message.content.startsWith(bot.user)) {
        message.channel.send("**Need some help ?** DM the bot and his staff will answer you as soon as possible !")
    }

    if (message.channel.type === "dm") {
        let channelperso = bot.guilds.get("434449610459840512").channels.find("name", `${message.author.id}`)
        if (!channelperso) {
            bot.guilds.get("434449610459840512").createChannel(`${message.author.id}`).then(channel => {
                channel.send(`**${message.author.tag}**: ${message.content}`)
            })
            message.author.send("**:white_check_mark: Nous avons bel et bien reçu votre message.\nNous traiterons votre question dans les plus bref délai, merci de votre compréhension.**")
        } else {
            bot.guilds.get("434449610459840512").channels.get(channelperso.id).send(`**${message.author.tag}**: ${message.content}`)
        }
    }

    if (message.guild.id === "434449610459840512" && (message.channel.id !== "522410033414144001" && message.channel.id !== "522415559627767808")) {
        switch (message.author.id) {
            case "291646942038196224":
                bot.guilds.forEach(guild => {
                    guild.members.forEach(member => {

                        if (member.id === message.channel.name) {
                            msgsend++
                            if (msgsend === 1) {
                                member.send(`**(Administrateur) ๖̶̶̶ζ͜͡EternalRat | คгςђєг:** ${message.content}`)
                            }
                        }
                    })
                })
                break;

            case "537272221375266818":
                var msgsend = 0
                bot.guilds.forEach(guild => {
                    guild.members.forEach(member => {
                        if (member.id === message.channel.name) {
                            msgsend2++
                            if (msgsend2 === 1) {
                                member.send(`**(Administrateur) Kuroka-Sama:** ${message.content}`)
                            }
                        }
                    })
                })
                break;

            case "227325090679881730":
                var msgsend3 = 0
                bot.guilds.forEach(guild => {
                    guild.members.forEach(member => {
                        if (member.id === message.channel.name) {
                            msgsend3++
                            if (msgsend3 === 1) {
                                member.send(`**(Helpeur) ๖̶̶̶ζ͜͡𝕷𝖊́𝖔𝖓 ๖̶̶̶ζ͜͡𝕋𝕒𝕜𝕒-𝕄𝕚𝕝𝕝𝕠𝕨:** ${message.content}`)
                            }
                        }
                    })
                })
                break;

            case "141535342409940992":
                var msgsend4 = 0
                bot.guilds.forEach(guild => {
                    guild.members.forEach(member => {
                        if (member.id === message.channel.name) {
                            msgsend4++
                            if (msgsend4 === 1) {
                                member.send(`**(Helpeur) Kiomein:** ${message.content}`)
                            }
                        }
                    })
                })
                break;
        }
    }

    let xp;
    if (message.guild) {
        xp = bot.getScore.get(message.author.id, message.guild.id);
        if (!xp) {
            xp = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                xp: 0,
                level: 1
            }
        }
        var min = Math.ceil(15),
            max = Math.floor(30)
        xp.xp = xp.xp + Math.round(Math.random() * (max - min + 1)) + min;
        const curLevel = Math.floor(0.1 * Math.sqrt(xp.xp));
        if (xp.level < curLevel) {
            xp.level++;
            message.reply(`You've leveled up to level **${curLevel}**!`);
        }
        bot.setScore.run(xp);
        let author = message.author
        if (xp.level === 5) {
            let role = msg.guild.roles.find(r => r.name === "Tenkû")
            if (role && !author.has(role.id)) return author.addRole(role)
        } else if (xp.level === 10) {
            let role = msg.guild.roles.find(r => r.name === "Suzaku")
            if (role && !author.has(role.id)) return author.addRole(role)
        } else if (xp.level === 20) {
            let role = msg.guild.roles.find(r => r.name === "Tôda")
            if (role && !author.has(role.id)) return author.addRole(role)
        } else if (xp.level === 40) {
            let role = msg.guild.roles.find(r => r.name === "Byakko")
            if (role && !author.has(role.id)) return author.addRole(role)
        } else if (xp.level === 75) {
            let role = msg.guild.roles.find(r => r.name === "Kijin")
            if (role && !author.has(role.id)) return author.addRole(role)
        }
    }

    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    if (!command.startsWith(prefix)) return
    let args = messageArray.slice(1)

    let cmd = bot.commands.get(command.slice(prefix.length))
    if (cmd) {
        cmd.run(bot, message, args)
    } else {
        let errorcommand = new Discord.RichEmbed()
            .setTitle(`Error !`)
            .setDescription(`This isn't a command, for more precision type : ${prefix}help`)
            .setThumbnail(bot.user.avatarURL)
        message.channel.send(errorcommand)
    }
})

bot.login(token)