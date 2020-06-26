require('dotenv').config();
const Discord = require('discord.js');
const bitbot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bitbot.login(TOKEN);

bitbot.on('ready', () => {
  console.info(`Logged in as ${bitbot.user.tag}!`);
});

bitbot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
    msg.channel.send('pong');

  } else if (msg.content.startsWith('!kick')) {
    if (msg.mentions.users.size) {
      const taggedUser = msg.mentions.users.first();
      msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
    } else {
      msg.reply('Please tag a valid user!');
    }
  }
});
