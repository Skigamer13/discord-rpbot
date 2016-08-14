'use babel';
'use strict';

import graf from 'discord-graf';
import yargs from 'yargs';
import version from './version';

export const config = graf.config.yargs(yargs)
	.usage('$0 [command] [options]')
	.example('$0 --token SomeAPITokenGoesHere', 'Starts the bot using a token')
	.example('$0 --email SomeGuy@SomeSite.com --password SomeCrazyPassword123', 'Starts the bot using an email and password')
	.example('$0 --config settings.yml', 'Starts the bot using a config file')
	.example('$0 completion', 'Outputs Bash completion script')
	.epilogue(`RPBot v${version} by Schuyler Cebulskie (Gawdl3y): https://github.com/Gawdl3y/discord-rpbot/`)

	.default('log', 'rpbot.log')
	.default('storage', 'rpbot-storage')

	// Database
	.option('database', {
		type: 'string',
		default: 'rpbot.sqlite3',
		alias: 'd',
		describe: 'Path to SQLite3 database file',
		group: 'Database:',
		normalize: true
	})
	.option('database-verbose', {
		type: 'boolean',
		alias: 'V',
		describe: 'Whether or not SQLite3 should be put into verbose mode',
		group: 'Database:'
	})

	// General
	.option('analytics', {
		type: 'boolean',
		default: true,
		alias: 'A',
		describe: 'Whether or not to enable anonymous, non-unique, non-identifiable analytics',
		group: 'General:'
	})

	// General yargs
	.help()
	.alias('help', 'h')
	.group('help', 'Special:')
	.version(version)
	.alias('version', 'v')
	.group('version', 'Special:')
	.completion('completion')
	.wrap(yargs.terminalWidth())
.argv;
export default config;
