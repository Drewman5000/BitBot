require('dotenv').config();
const Discord = require('discord.js');
const bitbot = new Discord.Client();
bitbot.commands = new Discord.Collection();
const bitbotCommands = require('./commands');

Object.keys(bitbotCommands).map(key => {
  bitbot.commands.set(bitbotCommands[key].name, bitbotCommands[key]);
});

const TOKEN = process.env.TOKEN;

bitbot.login(TOKEN);

bitbot.on('ready', () => {
  console.info(`Logged in as ${bitbot.user.tag}!`);
});

const coinFlip = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


bitbot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (message.substring(0, 1) == '!') {
    const pieces = message.substring(1).split(' ');
    const cmd = pieces[0];

    pieces = pieces.splice(1);
    switch(cmd) {
      case 'ping':

      if (!bitbot.commands.has(command)) return;

      try {
        bitbot.commands.get(command).execute(msg, args);
      } catch (error) {
        console.error(error);
        msg.reply('There was an error trying to execute that command!');
      };
      break;
      case 'bitbot':
        let respond = (coinFlip(0, 1)) ? "Yes." : "No.";
        msg.channel.send(respond);
        break;
    }
  }
});
