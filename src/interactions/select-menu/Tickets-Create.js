import {
    packages
} from '../../configs/packages.js'

export default {
    customId: 'Tickets-Create',
    async execute(interaction) {
        try {

            const value = interaction.values[0];

            const modal = new packages.Discord.ModalBuilder()
                .setTitle(`Opening ${value} Ticket`)
                .setCustomId('Ticket-Create')

            const Reason_To_Open = new packages.Discord.TextInputBuilder()
                .setCustomId('reason')
                .setLabel("What is the reason for this ticket?")
                .setStyle(packages.Discord.TextInputStyle.Paragraph)

            const ActionRow_Reason = new packages.Discord.ActionRowBuilder()
                .addComponents(Reason_To_Open)

            modal.addComponents(ActionRow_Reason)

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