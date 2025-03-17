import {
    packages
} from '../../configs/packages.js'

export default {
    name: 'Interaction Logger',
    description: 'The interaction logger system',
    enabled: true,
    once: false,
    async execute(interaction) {
        try {
            // If the interaction is not a button do nothing
            if (!interaction.isCommand() && !interaction.isButton() && interaction.isModalSubmit() && interaction.isStringSelectMenu()) return;

            const type = interaction.isCommand() ? 'Command' : interaction.isButton() ? 'Button' : interaction.isModalSubmit() ? 'Modal' : interaction.isStringSelectMenu() ? 'String Select Menu' : 'Unknown'
            console.log(
                packages.colors.blue(`[Interaction ${type}]: User: ${interaction.user.username} (${interaction.user.id} Date: ${new Date().toDateString()})`)
            ) 
        } catch (error) {
            console.error(error);
        }
    },
};