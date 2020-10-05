module.exports = {
	name: "coin",
	description: "Flips a coin.",
	execute(msg, args) {
		const coinFlip = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};
		let reply = "";
		let result = coinFlip(0, 1);

		reply = result ? "Heads" : "Tails";

		msg.channel.send(reply);
	},
};
