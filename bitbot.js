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

const getPrefix = () => return prefix;

bitbot.on('message', msg => {
  const args = msg.content.split(/\s+/);

  const message = msg.content;
  console.log(getPrefix());
  const regex = /(${prefix})(\bbit\b)/mig;
  // const regex = /(${prefix})(\b${command}\b)/mig;
  let m;

  while ((m = regex.exec(message)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      if (groupIndex === 2) {
        const command = match.toLowerCase();
        console.info(`Called command: ${command}`);

        if (!bitbot.commands.has(command)) return;

        try {
          bitbot.commands.get(command).execute(msg, args);
        } catch (error) {
          console.error(error);
          msg.reply('There was an error trying to execute that command! Ask Andrew to check the code for errors.');
        };
      }
    });
  }
});