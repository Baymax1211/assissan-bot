import {
	packages
} from '../../configs/packages.js'

export default {
	name: 'Buttons Interaction Handler',
	description: 'Buttons Interaction Handler system',
	enabled: true,
	once: false,
	async execute(interaction) {
		try {
			// If the interaction is not a button do nothing
			if (!interaction.isButton()) return;

			// Get all the buttons
			const ButtonsDir = packages.fs.readdirSync('./src/interactions/buttons').filter(file => file.endsWith('.js'));

			for (const file of ButtonsDir) {
				// Use dynamic import and destructure to get the default export
				const {
					default: FileExports
				} = await import(`../../interactions/buttons/${file}`);

				// Check if the customId matches the interaction
				if (FileExports && FileExports.customId === interaction.customId) {
					// Ensure execute is a function before calling it
					if (typeof FileExports.execute === 'function') {
						// Execute the SelectMenu
						await FileExports.execute(interaction);
						break;
					} else {
						console.error(`execute is not a function for ${interaction.customId}`);
					}
				}
			}
			return await interaction.reply({
				content: 'There was an error while executing this Button! Button not found',
				flags: packages.Discord.MessageFlags.Ephemeral,
			})
		} catch (error) {
			console.error(error);
			// Make sure we're only replying once
			if (!interaction.replied) {
				await interaction.reply({
					content: 'There was an error while executing this Button!',
					flags: packages.Discord.MessageFlags.Ephemeral,
				});
			} else {
				// Use followUp if already replied to
				await interaction.followUp({
					content: 'There was an error while executing this Button!',
					flags: packages.Discord.MessageFlags.Ephemeral,
				});
			}
		}
	},
};