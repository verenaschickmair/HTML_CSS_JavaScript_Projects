const Discord = require("discord.js");
const got = require("got");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async msg => {
  //PING-PONG
  if (msg.content === "ping") {
    let delay = Date.now() - msg.createdTimestamp;
    msg.channel.send("pong, delay: " + delay + "ms");
  }

  //COINFLIP
  if (msg.content.includes("!coinflip")) {
    let result = "HEADS";
    if (Math.random() > 0.5) {
      result = "TAILS";
    }

    // msg.reply(result + '—the coin has spoken!');
    msg.reply(`${result}—the coin has spoken!`);
  }

  //TIMER '!timer 5'
  if (msg.content.includes("!timer")) {
    let split = msg.content.split(" "); // ['!timer', '5']
    let time = Number(split[1]); // 5

    msg.reply(`timer timed to time: ${time}sec`);

    setTimeout(() => {
      msg.reply("times up!");
    }, time * 1000);
  }

  //QUOTE '!quote'
  if (msg.content.includes("!quote")) {
    const URL =
      "https://raw.githubusercontent.com/JamesFT/Database-Quotes-JSON/master/quotes.json";
    let quotes = await got(URL).json();

    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    let text = randomQuote.quoteText;
    let author = randomQuote.quoteAuthor;
    msg.channel.send(`"${text}" —${author}`);
  }

  //TRUMP 'trump me'
  if (msg.content.includes("trump me")) {
    const TRUMP_URL = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    let quote = await got(TRUMP_URL).json();
    
    msg.channel.send(`"${quote.message}" —Donald J. Trump`);
  }
});

client.login(process.env.DISCORD_TOKEN);
