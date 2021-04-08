const { User } = require("discord.js");

module.exports = {
	name: 'role',
	description: 'Pour changer de role si jamais vous vous êtes trompé, ou juste pas eu le temps de cocher',
	async run(message, args) {
		/* check if in server and not in DMs */
		if (message.guild === null) return;
		
		/* random color for embed */
		function randomColor() { return Math.floor(Math.random() * 16777215); }


		let firstY = 'YOUR ROLE ID'; // 1ère année
		let secondY = 'YOUR ROLE ID'; // 2nde année
		const emo = ['1️⃣', '2️⃣']; // emoji array 
		let userAvatar = message.author.displayAvatarURL();
		/* embed message because it's a bit more good loooking IMO */ 
		let emb = {
			"embed": {
				"description": "1️⃣ - 1ère année\n\n2️⃣ - 2nde année",
				"color": randomColor(),
				"thumbnail": {
					"url": userAvatar
				},
				"author": {
					"name": "Choose your role"
				},
				"footer": {
					"text": "You may wait until ALL reactions are added, otherwise some bugs can occurs"
                }
			}
		}
		/* Filter to the message author and the reaction array */ 
		const Filter = (reaction, user) => emo.includes(reaction.emoji.name) && user.id == message.author.id;
		/* wait for message to be sent */ 
		const awaitMsg = await message.channel.send(emb); 
		for (const e of emo) {
			/* for emoji in array, just add the reaction to message */
			await awaitMsg.react(e);
		}
		
		/* Max reaction: 1, 1 min delay => on reaction switch between case (here between emoji name) */
		awaitMsg.awaitReactions(Filter, { max: 1, time: 100000, errors: ['time'] }).then(collected => {
			const reaction = collected.first();

			switch (reaction.emoji.name) {
				case '1️⃣':
					/* if got the rolen tell user he already got it */ 
					if (message.member.roles.cache.has(firstY)) { return message.channel.send("You already have the role.") };
					/* remove second role if user got it */
					if (message.member.roles.cache.has(secondY)) { message.member.roles.remove(secondY); };
					/* add the role then send message to inform the user */
					message.member.roles.add(firstY).then(message.channel.send("Role added!"));
					break;
				case '2️⃣':
					if (message.member.roles.cache.has(secondY)) { return message.channel.send("You already have the role.") };
					if (message.member.roles.cache.has(firstY)) { message.member.roles.remove(firstY); };
					message.member.roles.add(secondY).then(message.channel.send("Role added!"));
					break;
            }
        })
	},
};
