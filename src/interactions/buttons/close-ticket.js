import {
  packages
} from '../../configs/packages.js';
import {
  configs
} from '../../configs/index.js';

export default {
  customId: 'close-ticket',
  async execute(interaction) {
    try {
        const date = Math.floor(new Date().getTime() + (1 * 60).toString() / 1000)
        const embed = new packages.Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket Closing')
            .setDescription(`This ticket will be closed in <t:${date}:R> Seconds.`)
            .setFields([
                { name: '**Closed By:**', value: `${interaction.user}` }
            ])
        
        await interaction.channel.send({
            embeds: [embed]
        });

        return setTimeout(async () => {
            await interaction.channel.delete()
        }, 10000)

    } catch (error) {
      console.error('Error closing the ticket channel:', error);
      await interaction.reply({
        content: 'There was an error while closing the ticket channel.',
        flags: packages.Discord.MessageFlags.Ephemeral,
      });
    }
  }
};