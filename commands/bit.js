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
		reply = (result) ? "Yes. :white_check_mark:" : "No. :no_entry_sign:";

		msg.channel.send(reply);
	},
};