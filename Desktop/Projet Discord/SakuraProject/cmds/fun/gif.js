const Discord = require("discord.js")
const request = require("request")

module.exports.run = async (bot, msg, args) => {
    const gifGenerator = function (search) {
        const APIkey = '&api_key=' + 'dc6zaTOxFJmzC&tag';
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${args.join("_") + APIkey}&limit=30`
        request(queryURL, function (err, response, body) {
            if (err) throw err
            const results = JSON.parse(body)
            const randomNum = Math.floor(Math.random() * 10)
    
            const gifURL = results.data[randomNum].images.fixed_height.url
            msg.channel.send(gifURL)
                .catch(console.error)
        });
    }
    gifGenerator()
}

module.exports.help = {
    name: "gif"
}