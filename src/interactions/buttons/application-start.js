import { packages } from '../../configs/packages.js'

export default {
    customId: 'application-start',
    async execute(interaction) {
        try {
            const modal = new packages.Discord.ModalBuilder()
                .setTitle('Application')
                .setCustomId('application-start')

            const RobloxUser = new packages.Discord.TextInputBuilder()
                .setCustomId('question-1')
                .setLabel('What is your Roblox Username?')
                .setStyle(packages.Discord.TextInputStyle.Short)
                .setRequired(true)

            const OverAge = new packages.Discord.TextInputBuilder()
                .setCustomId('question-2')
                .setLabel('Are you above the age of 13? Yes or No')
                .setStyle(packages.Discord.TextInputStyle.Short)
                .setRequired(true)

            const Experience = new packages.Discord.TextInputBuilder()
                .setCustomId('question-3')
                .setLabel('What is your experience with roleplays?')
                .setStyle(packages.Discord.TextInputStyle.Short) // Changed to 'Short' to reduce width
                .setPlaceholder('Please use up to 2 sentences. Use proper grammar and punctuation.')
                .setRequired(true)

            const Active = new packages.Discord.TextInputBuilder()
                .setCustomId('question-4')
                .setLabel('How active will you be in the server? 1-5')
                .setStyle(packages.Discord.TextInputStyle.Short) // Changed to 'Short' to reduce width
                .setPlaceholder('1 means not very active at all, while 5 indicates being active at all times.')
                .setRequired(true)

            const Motivates = new packages.Discord.TextInputBuilder()
                .setCustomId('question-5')
                .setLabel('What motivates you to join this server?')
                .setStyle(packages.Discord.TextInputStyle.Short) // Changed to 'Short' to reduce width
                .setPlaceholder('Please use up to 2 sentences. Use proper grammar and punctuation.')
                .setRequired(true)

            // Split components into more action rows for better layout handling
            const ActionRow1 = new packages.Discord.ActionRowBuilder()
                .addComponents(RobloxUser)

            const ActionRow2 = new packages.Discord.ActionRowBuilder()
                .addComponents(OverAge)

            const ActionRow3 = new packages.Discord.ActionRowBuilder()
                .addComponents(Experience)

            const ActionRow4 = new packages.Discord.ActionRowBuilder()
                .addComponents(Active)

            const ActionRow5 = new packages.Discord.ActionRowBuilder()
                .addComponents(Motivates)

            modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5)

            return await interaction.showModal(modal)
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'There was an error while making this modal!',
                flags: packages.Discord.MessageFlags.Ephemeral,
            });
        }
    }
}
