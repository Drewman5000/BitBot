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
  // const args = msg.content.split(/\s+/);
  const message = msg.content;
  // const regex = /(!)(\b(bit|coin)\b)/ig;
  
  for (item in bitbotCommands) {
    let commandTest = bitbotCommands[item].name.toLowerCase();
    let regexp = new RegExp("("+prefix+")(\\b("+commandTest+")\\b)","gi");

    let m;

    while((m = regexp.exec(message)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regexp.lastIndex) {
        regexp.lastIndex++;
      }
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        if (groupIndex === 2) {
          const command = match.toLowerCase();
          console.info(`Called command: ${command}`);

          if (!bitbot.commands.has(command)) return;

          try {
            bitbot.commands.get(command).execute(msg); // This is where to pass args back in to the command if needed.
          } catch (error) {
            console.error(error);
            msg.reply('There was an error trying to execute that command!');
          };
        }
      });
    };
  }
});