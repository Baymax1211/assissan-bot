import {
  packages
} from '../../configs/packages.js';

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

      let replied = false;
      for (const file of SelectMenusDir) {
        const {
          default: FileExports
        } = await import(`../../interactions/select-menu/${file}`);

        if (FileExports && FileExports.customId === interaction.customId) {
          if (typeof FileExports.execute === 'function') {
            await FileExports.execute(interaction);
            replied = true;
            break;
          } else {
            console.error(`execute is not a function for ${interaction.customId}`);
          }
        }
      }

      if (!replied && !interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'There was an error while executing this SelectMenu! Menu not found',
          flags: packages.Discord.MessageFlags.Ephemeral,
        });
      }

    } catch (error) {
      console.error(error);
      // Make sure we're only replying once
      if (!interaction.replied) {
        await interaction.reply({
          content: 'There was an error while executing this Select Menu!',
          flags: packages.Discord.MessageFlags.Ephemeral,
        });
      } else {
        // Use followUp if already replied to
        await interaction.followUp({
          content: 'There was an error while executing this Select Menu!',
          flags: packages.Discord.MessageFlags.Ephemeral,
        });
      }
    }
  },
};