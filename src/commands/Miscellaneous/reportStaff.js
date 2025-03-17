import {
    configs
} from '../../configs/index.js';
import {
    packages
} from '../../configs/packages.js';

export default {
    data: new packages.Discord.SlashCommandBuilder()
        .setName('report-staff')
        .setDescription('Report a staff member')
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason to report the staff member')
            .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('staff-member')
            .setDescription('The staff member to report')
            .setRequired(true)
        ),

    async execute(interaction) {
        try {
            // Get the options from the interaction
            const reason = interaction.options.getString('reason');
            const staffMember = interaction.options.getUser('staff-member');

            // Create an embed for the report
            const reportEmbed = new packages.Discord.EmbedBuilder()
                .setTitle('Staff Report')
                .setDescription(`A staff member has been reported.`)
                .setColor('Red')
                .setTimestamp()
                .addFields({
                    name: 'Reported By:',
                    value: `<@${interaction.user.id}>`,
                    inline: true
                }, {
                    name: 'Staff Member:',
                    value: `<@${staffMember.id}>`,
                    inline: true
                }, {
                    name: 'Reason:',
                    value: reason,
                    inline: false
                });

            const reportChannel = await interaction.guild.channels.fetch(configs.JSON.channel['Staff-Reports']);

            // Send the report to the report channel
            await reportChannel.send({
                embeds: [reportEmbed]
            });

            // Respond to the user that the report has been submitted
            await interaction.reply({
                content: `Your report for <@${staffMember.id}> has been successfully submitted! Thank you for helping us keep the community safe.`,
                flags: packages.Discord.MessageFlags.Ephemeral
            });

        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error with this command.',
                flags: packages.Discord.MessageFlags.Ephemeral
            });
        }
    }
};