import { packages } from '../../configs/packages.js';

export default {
    customId: 'application-deny',
    async execute(interaction) {
        try {
            const currentEmbed = interaction.message.embeds[0];
            
            // Create a new EmbedBuilder and copy content from the current embed
            const updatedEmbed = new packages.Discord.EmbedBuilder()
                .setTitle(currentEmbed.title)
                .setDescription(currentEmbed.description)
                .setColor('Red') // Set the color to red
                .setTimestamp()
                .setFields(currentEmbed.fields); // Copy the fields

            updatedEmbed.addFields({
                name: 'Denied By:',
                value: `${interaction.user.tag}`,
            });

            await interaction.message.edit({
                embeds: [updatedEmbed],
                components: []
            });

            return await interaction.reply({
                content: 'This application has been denied'
            });

        } catch (error) {
            console.error('Error denying user:', error);
            await interaction.reply({
                content: 'There was an error while denying the user.',
                flags: packages.Discord.MessageFlags.Ephemeral,
            });
        }
    }
};
