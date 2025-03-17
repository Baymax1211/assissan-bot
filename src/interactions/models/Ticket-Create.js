import {
  packages
} from '../../configs/packages.js';
import {
  configs
} from '../../configs/index.js';

export default {
  customId: 'Ticket-Create',
  async execute(interaction, data) {
    try {

      const ID = data[0].customId.split('reason-')[1];
      const AllowedRoles = [
        configs.JSON.permissions.IA,
        configs.JSON.permissions.director,
        configs.JSON.permissions.management,
      ];

      let Channel = null;
      try {
        Channel = await interaction.guild.channels.create({
          name: `${ID}-${interaction.user.username}`,
          type: 0,
          topic: `${ID} ticket for ${interaction.user.username}. Opened at ${new Date().toDateString()}`,
          parent: `${configs.JSON.channel.tickets.category}`,
          permissionOverwrites: [{
              type: 0,
              id: interaction.guild.id,
              deny: [packages.Discord.PermissionFlagsBits.ViewChannel],
            },
            {
              type: 1,
              id: interaction.user.id,
              allow: [
                packages.Discord.PermissionFlagsBits.ViewChannel,
                packages.Discord.PermissionFlagsBits.SendMessages,
                packages.Discord.PermissionFlagsBits.ReadMessageHistory,
              ],
            },
            ...AllowedRoles.map((role) => ({
              type: 0,
              id: role,
              allow: [
                packages.Discord.PermissionFlagsBits.ViewChannel,
                packages.Discord.PermissionFlagsBits.SendMessages,
                packages.Discord.PermissionFlagsBits.ReadMessageHistory,
              ],
            })),
          ],
          reason: 'Tickets'
        });

      } catch (error) {
        console.error("Error creating the ticket channel:", error);
      }

      const embed = new packages.Discord.EmbedBuilder()
        .setColor('Red')
        .setTitle(`${ID} Ticket`)
        .setDescription(`Welcome to the ticket. Below you can find information about the ticket.`)
        .setFields([{
            name: '**Opened By:**',
            value: `${interaction.user}`
          },
          {
            name: `**Opened At:**`,
            value: `<t:${Math.floor(Date.now() / 1000)}:R>`
          },
          {
            name: '*Reason:**',
            value: data[0].value
          }
        ]);

        console.log(packages.Discord.ButtonStyle)

      const buttons = new packages.Discord.ActionRowBuilder()
        .addComponents(
          new packages.Discord.ButtonBuilder()
          .setStyle(packages.Discord.ButtonStyle.Danger)
          .setCustomId('close-ticket')
          .setLabel('🔒 Close Ticket')
        )
        .addComponents(
          new packages.Discord.ButtonBuilder()
          .setStyle(packages.Discord.ButtonStyle.Secondary)
          .setCustomId('claim-ticket')
          .setLabel('🔑 Claim Ticket')
        );

      await Channel.send({
        embeds: [embed],
        content: `${interaction.user}`,
        components: [buttons]
      })

      await interaction.reply({
        content: `Your ticket channel, <#${Channel.id}>, has been created!`,
        flags: packages.Discord.MessageFlags.Ephemeral,
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