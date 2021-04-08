module.exports = {
	name: 'ping',
	description: 'Ping!',
	run(message, args) {
		/* test command */
		message.channel.send('Pong.');
	},
};
