import { packages } from '../../configs/packages.js';
import { configs } from '../../configs/index.js';

export default {
  customId: 'application-start',
  async execute(interaction, data) {
    try {
      // Create an EmbedBuilder instance
      const Embed = new packages.Discord.EmbedBuilder()
        .setTitle('New Application Response')
        .setDescription(`New application from <@${interaction.user.id}> (${interaction.user.id})`)
        .setTimestamp()
        .setFields([]);

      // Add fields from the modal data
      for (const value of data) {
        Embed.addFields({
          name: `${value.customId}`,
          value: `${value.value}`,
        });
      }

      const buttons = new packages.Discord.ActionRowBuilder()
        .addComponents(
          new packages.Discord.ButtonBuilder()
          .setStyle(packages.Discord.ButtonStyle.Success) 
          .setCustomId('application-accepted')
          .setLabel('Accept')
        )
        .addComponents(
          new packages.Discord.ButtonBuilder()
          .setStyle(packages.Discord.ButtonStyle.Danger)
          .setCustomId('application-deny')
          .setLabel('Deny')
        );


      const channel = await interaction.guild.channels.fetch(configs.JSON.channel.applications.review);

      // Send the embed to the target channel
      await channel.send({
        embeds: [Embed],
        components: [buttons]
      });

      return await interaction.reply({
        content: 'Your application has been submitted successfully!',
        ephemeral: packages.Discord.MessageFlags.Ephemeral,
      });

    } catch (error) {
      console.error('Error creating the ticket channel:', error);
      await interaction.reply({
        content: 'There was an error while processing your application.',
        flags: packages.Discord.MessageFlags.Ephemeral,
      });
    }
  },
};
