const Discord = require("discord.js")
const Canvas = require("canvas")
const SQLite = require("better-sqlite3")
const xpp = SQLite('./exp.sqlite');

module.exports.run = async (bot, msg, args) => {
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
	const top10 = xpp.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY xp DESC LIMIT 100;").all(msg.guild.id);
	var prec = 0
	var xpmissin
	var x = 1

	let xp = bot.getScore.get(msg.author.id, msg.guild.id);
	if (xp.xp >= 1000000000) {
		prec = (xp.xp / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
	} else if (xp.xp >= 1000000) {
		prec = (xp.xp / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (xp.xp >= 1000) {
		prec = (xp.xp / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
	} else if (xp.xp <= 1000) {
		prec = xp.xp
	}
	let xpmissing = Math.floor(Math.pow((xp.level+1)/0.1,2))
	if (xpmissing >= 1000000000) {
		xpmissin = (xpmissing / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
	} else if (xpmissing >= 1000000) {
		xpmissin = (xpmissing / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (xpmissing >= 1000) {
		xpmissin = (xpmissing / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
	} else if (xpmissing <= 1000) {
		xpmissin = xpmissing
	}

	// Since the image takes time to load, you should await it
	const background = await Canvas.loadImage("./cmds/fun/card.png");
	// This uses the canvas dimensions to stretch the image onto the entire canvas
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// Select the font size and type from one of the natively available fonts
	ctx.font = '20px sans-serif';
	// Select the style that will be used to fill the text in
	ctx.fillStyle = '#c90330';
	// Actually fill the text with a solid color
	ctx.fillText(msg.author.username, canvas.width / 3, canvas.height / 2);
	for (const data of top10) {
		if (bot.users.get(data.user).id != msg.author.id) {
			x = x + 1
		} else {
			ctx.fillText(`RANK #${x}`, canvas.width / 2.1, canvas.height / 1.5);
		}
	}
	ctx.fillText(`Level #${xp.level}`, canvas.width / 1.5, canvas.height / 1.5);
	ctx.fillText(`${prec} / ${xpmissin} XP`, canvas.width / 1.3, canvas.height / 2)

	// Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

	var image;
	if(!msg.author.avatarURL) {
		image = bot.user.avatarURL
	} else {
		image = msg.author.avatarURL
	}

	// Wait for Canvas to load the image
	const avatar = await Canvas.loadImage(image);
	// Draw a shape onto the main canvas
	ctx.drawImage(avatar, 25, 0, 200, 250);

	// Use helpful Attachment class structure to process the file for you
	const attachment = new Discord.Attachment(canvas.toBuffer(), "./cmds/fun/card.png");

	msg.channel.send(attachment);
}

module.exports.help = {
	name: "rank"
}