import { packages } from '../../configs/packages.js';
import { configs } from '../../configs/index.js';

export default {
    customId: 'application-accepted',
    async execute(interaction) {
        try {
            const currentEmbed = interaction.message.embeds[0];
            const updatedEmbed = new packages.Discord.EmbedBuilder()
                .setTitle(currentEmbed.title)
                .setDescription(currentEmbed.description)
                .setColor('Green')
                .setTimestamp()
                .setFields(currentEmbed.fields);

            updatedEmbed.addFields({
                name: 'Accepted By:',
                value: `${interaction.user.tag}`,
            });

            await interaction.message.edit({
                embeds: [updatedEmbed],
                components: []
            });

            const User_Regex = /<@(\d{18,19})>/;
            const match = User_Regex.exec(interaction.message.embeds[0].description);

            if (match) {
                const UserID = match[1];
                const user = await interaction.guild.members.fetch(UserID);

                await user.roles.remove(configs.JSON.roles.Unverified);
                await user.roles.add(configs.JSON.roles.Community_Member);

                return await interaction.reply({
                    content: 'This application has been accepted.',
                    ephemeral: packages.Discord.MessageFlags.Ephemeral
                });
            } else {
                return await interaction.reply({
                    content: 'Could not find the user in the application.',
                    flags: packages.Discord.MessageFlags.Ephemeral,
                });
            }

        } catch (error) {
            console.error('Error accepting user:', error);
            await interaction.reply({
                content: 'There was an error while accepting the user.',
                flags: packages.Discord.MessageFlags.Ephemeral,
            });
        }
    }
};