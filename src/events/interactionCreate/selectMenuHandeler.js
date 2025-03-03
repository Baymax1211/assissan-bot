import { packages } from '../../configs/packages.js';

export default {
  name: 'SelectMenu Interaction Handler',
  description: 'SelectMenus Interaction Handler system',
  enabled: true,
  once: false,
  async execute(interaction) {
    try {
      // If the interaction is not a SelectMenu, do nothing
      if (!interaction.isStringSelectMenu()) return;

      // Get all the SelectMenus
      const SelectMenusDir = packages.fs.readdirSync('./src/interactions/select-menu').filter(file => file.endsWith('.js'));

      // Check if the SelectMenu exists
      let replied = false;
      for (const file of SelectMenusDir) {
        // Use dynamic import and destructure to get the default export
        const { default: FileExports } = await import(`../../interactions/select-menu/${file}`);

        // Check if the customId matches the interaction
        if (FileExports && FileExports.customId === interaction.customId) {
          // Ensure execute is a function before calling it
          if (typeof FileExports.execute === 'function') {
            // Execute the SelectMenu
            await FileExports.execute(interaction);
            replied = true;
            break;
          } else {
            console.error(`execute is not a function for ${interaction.customId}`);
          }
        }
      }

      // If not replied yet, send a default reply message
      if (!replied && !interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'There was an error while executing this SelectMenu! Menu not found',
          flags: packages.Discord.MessageFlags.Ephemeral,
        });
      }

    } catch (error) {
      console.error(error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'There was an error while executing this SelectMenu!',
          flags: packages.Discord.MessageFlags.Ephemeral,
        });
      }
    }
  },
};