module.exports = {
	name: 'ping',
	description: 'Ping!',
	run(message, args) {
		message.channel.send('Pong.');
	},
};