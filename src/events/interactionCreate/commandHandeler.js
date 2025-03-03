import { packages } from '../../configs/packages.js'
export default {
	name: 'Commands Interaction Handler',
	description: 'Commands Interaction Handler system',
	enabled: true,
	once: false,
	async execute(interaction) {
		try {
			// If the interaction is not a command do nothing
			if (!interaction.isCommand()) return;

			// Check if the command exists
			const command = interaction.client.commands.find((cmd) => cmd.name === interaction.commandName);

			// Do nothing if the command doesn't exist
			if (!command) return;

			// Execute the command
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: packages.Discord.MessageFlags.Ephemeral,
			});
		}
	},
};
