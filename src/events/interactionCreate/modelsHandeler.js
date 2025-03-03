import {
	packages
} from '../../configs/packages.js'

export default {
	name: 'Models Interaction Handler',
	description: 'Models Interaction Handler system',
	enabled: true,
	once: false,
	async execute(interaction) {
		try {
			// If the interaction is not a Model do nothing
			if (!interaction.isModalSubmit()) return;

			// Get all the Models
			const ModelsDir = packages.fs.readdirSync('./src/interactions/models').filter(file => file.endsWith('.js'));
			const data = interaction.modelData;

			for (const file of ModelsDir) {
				// Use dynamic import and destructure to get the default export
				const {
					default: FileExports
				} = await import(`../../interactions/models/${file}`);

				// Check if the customId matches the interaction
				if (FileExports && FileExports.customId === interaction.customId) {
					// Ensure execute is a function before calling it
					if (typeof FileExports.execute === 'function') {
						// Execute the SelectMenu
						await FileExports.execute(interaction, data);
						break;
					} else {
						console.error(`execute is not a function for ${interaction.customId}`);
					}
				}
			}

			return await interaction.reply({
				content: 'There was an error while executing this Model! Model not found',
				flags: packages.Discord.MessageFlags.Ephemeral,
			})

		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this Model!',
				flags: packages.Discord.MessageFlags.Ephemeral,
			});
		}
	},
};