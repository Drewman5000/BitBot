module.exports = {
	name: 'bit',
	description: 'Yes or No.',
	execute(msg, args) {
		//msg.reply('pong');
		const coinFlip = (min, max) => {
  			return Math.floor(Math.random() * (max - min + 1) ) + min;
		}
		let reply = "";
		let result = coinFlip(0, 1);
		reply = (result) ? "Yes." : "No.";

		msg.channel.send(reply);
	},
};