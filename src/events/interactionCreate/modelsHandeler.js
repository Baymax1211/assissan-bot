import {
	packages
} from '../../configs/packages.js';

export default {
	name: 'Models Interaction Handler',
	description: 'Models Interaction Handler system',
	enabled: true,
	once: false,
	async execute(interaction) {
		try {
			// If the interaction is not a Modal, do nothing
			if (!interaction.isModalSubmit()) return;

			// Get all the Models
			const ModelsDir = packages.fs.readdirSync('./src/interactions/models').filter(file => file.endsWith('.js'));
			const data = interaction.fields.fields ? interaction.fields.fields.toJSON() : [];

			let modelFound = false;

			for (const file of ModelsDir) {
				const {
					default: FileExports
				} = await import(`../../interactions/models/${file}`);

				// Check if the customId matches the interaction
				if (FileExports && FileExports.customId === interaction.customId) {
					// Ensure execute is a function before calling it
					if (typeof FileExports.execute === 'function') {
						// Execute the SelectMenu
						await FileExports.execute(interaction, data);
						modelFound = true;
						break;
					} else {
						console.error(`execute is not a function for ${interaction.customId}`);
					}
				}
			}

			// If no model found, follow-up with an error
			if (!modelFound) {
				return await interaction.followUp({
					content: 'There was an error while executing this Model! Model not found',
					flags: packages.Discord.MessageFlags.Ephemeral,
				});
			}

		} catch (error) {
			console.error(error);

			// Make sure we're only replying once
			if (!interaction.replied) {
				await interaction.reply({
					content: 'There was an error while executing this Model!',
					flags: packages.Discord.MessageFlags.Ephemeral,
				});
			} else {
				// Use followUp if already replied to
				await interaction.followUp({
					content: 'There was an error while executing this Model!',
					flags: packages.Discord.MessageFlags.Ephemeral,
				});
			}
		}
	},
};