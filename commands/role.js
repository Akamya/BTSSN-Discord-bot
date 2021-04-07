const { User } = require("discord.js");

module.exports = {
	name: 'role',
	description: 'Pour changer de role si jamais vous vous êtes trompé, ou juste pas eu le temps de cocher',
	async run(message, args) {
		if (message.guild === null) return;

		function randomColor() { return Math.floor(Math.random() * 16777215); }


		let firstY = '528275244570640445';
		let secondY = '528275333129175070';
		const emo = ['1️⃣', '2️⃣'];
		let userAvatar = message.author.displayAvatarURL();
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

		const Filter = (reaction, user) => emo.includes(reaction.emoji.name) && user.id == message.author.id;
		const awaitMsg = await message.channel.send(emb);
		for (const e of emo) {
			await awaitMsg.react(e);
		}

		awaitMsg.awaitReactions(Filter, { max: 1, time: 100000, errors: ['time'] }).then(collected => {
			const reaction = collected.first();

			switch (reaction.emoji.name) {
				case '1️⃣':
					if (message.member.roles.cache.has(firstY)) { return message.channel.send("You already have the role.") };
					if (message.member.roles.cache.has(secondY)) { message.member.roles.remove(secondY); };
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