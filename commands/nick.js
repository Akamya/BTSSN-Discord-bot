module.exports = {
	name: 'nick',
	description: 'Change nickname of user',
	run(message, args) {
		let s = true;
		var fNick = '';
		/* concatenate the args (message content) */ 
		try {
			for (var i = 1; i < args.length; i++) {
				fNick += args[i] + ' ';
            	}
			message.member.setNickname(fNick);
		} catch (e) {
			s = false;
        	}
		/* if success send a message to the user */ 
		if (s) {
			message.channel.send("Successfully changed your nickname to " + fNick);
        	}
	},
};
