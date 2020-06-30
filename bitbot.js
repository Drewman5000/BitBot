require('dotenv').config();
const { prefix, author } = require('./config.json');
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

bitbot.on('message', msg => {
  const args = msg.content.split(/\s+/);
  commandFilter = (arr, query) => {
    return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }
  let commands = (commandFilter(args, prefix));

  for ( el of commands ) {

    if (el.substring(0, 1) == prefix) {
      const command = el.substring(1).toLowerCase();
      console.info(`Called command: ${command}`);

      if (!bitbot.commands.has(command)) return;

      try {
        bitbot.commands.get(command).execute(msg, args);
      } catch (error) {
        console.error(error);
        msg.reply('There was an error trying to execute that command!');
      };
    }
  }
});