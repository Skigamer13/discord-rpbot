'use babel';
'use strict';

import graf from 'discord-graf';
import Character from '../../database/character';

const mentionsPattern = /@everyone|@here|<@!?&?[0-9]+>/i;

export default {
	name: 'addcharacter',
	aliases: ['addchar'],
	group: 'characters',
	groupName: 'add',
	description: 'Adds a character to the database, or updates the existing one.',
	usage: 'addcharacter <name> <info>',
	details: 'The character name can be a maximum of 60 characters long, and must be surrounded by quotes if it contains spaces. The information doesn\'t have to be a single line. Only the owner of the character and administrators/moderators may update it.',
	examples: ['addcharacter Bob Just your average guy.', 'addcharacter "Billy McBillface" A really cool guy who enjoys his chicken tendies.'],
	serverOnly: true,
	argsType: 'multiple',
	argsCount: 2,

	async run(message, args) {
		const name = args[0], info = args[1];
		if(!name || !info) throw new graf.util.CommandFormatError(this, message.server);
		if(mentionsPattern.test(name) || mentionsPattern.test(info)) return 'Please do not use mentions in your character name or information.';

		// Apply some restrictions
		if(name.length > 60) return 'A character\'s name may not be longer than 60 characters.';
		if(name.includes('\n')) return 'A character\'s name may not have multiple lines.';

		// Add or update the character
		const result = await Character.save(new Character(message.server, message.author, name, info));
		if(result) {
			return `${result.new ? 'Added' : 'Updated'} character "${name}".`;
		} else {
			return `Unable to update character "${name}". You are not the owner.`;
		}
	}
};
