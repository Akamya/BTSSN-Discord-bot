module.exports = {
	name: 'nick',
	description: 'Change nickname of user',
	run(message, args) {
		let s = true;
		var fNick = '';
		try {
			for (var i = 1; i < args.length; i++) {
				fNick += args[i] + ' ';
            }
			message.member.setNickname(fNick);
		} catch (e) {
			s = false;
        }

		if (s) {
			message.channel.send("Successfully changed your nickname to " + fNick);
        }
	},
};