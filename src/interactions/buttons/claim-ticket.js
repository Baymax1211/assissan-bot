import {
  packages
} from '../../configs/packages.js';
import {
  configs
} from '../../configs/index.js';

export default {
  customId: 'claim-ticket',
  async execute(interaction) {
    try {
      const UserRoles = await interaction.member.roles.cache;

      const AllowedRoles = [
        configs.JSON.permissions.IA,
        configs.JSON.permissions.director,
        configs.JSON.permissions.management,
      ]

      const CanRun = UserRoles ? await UserRoles.some(role => AllowedRoles.includes(role.id)) : false

      if (!CanRun) {
        return await interaction.reply({
          content: "You don't have the correct permissions to use this button",
          flags: packages.Discord.MessageFlags.Ephemeral
        })
      }

      const embed = new packages.Discord.EmbedBuilder()
        .setColor('Green')
        .setTitle('Ticket Claimed')
        .setDescription(`This ticket has been claimed by ${interaction.user}. Please wait for a response and don't ping anyone.`)

      return await interaction.channel.send({
        embeds: [embed]
      });
    } catch (error) {
      console.error('Error creating the ticket channel:', error);
      await interaction.reply({
        content: 'There was an error while creating the ticket channel.',
        flags: packages.Discord.MessageFlags.Ephemeral,
      });
    }
  }
};