module.exports = {
	name: 'bit',
	description: 'Yes or No.',
	execute(msg, args) {
		//msg.reply('pong');
		const choices = require('./choices.json');
		const coinFlip = (min, max) => {
  			return Math.floor(Math.random() * (max - min + 1) ) + min;
		}
		let reply = "";
		let publish = choices.no[coinFlip(0, 6)];
		let result = coinFlip(0, 1);
		if (result) {
			publish = choices.yes[coinFlip(0, 4)];
		};

		reply = (result) ? "Yes. " + publish : "No. " + publish;

		msg.channel.send(reply);
	},
};