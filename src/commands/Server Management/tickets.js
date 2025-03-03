import { configs } from '../../configs/index.js'
import { packages } from '../../configs/packages.js'

export default {
    data: new packages.Discord.SlashCommandBuilder()
        .setName('send-tickets')
        .setDescription('Send the ticket system'),
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
                    content: '[Error]: You do not have the correct permission to run this command',
                    flags: packages.Discord.MessageFlags.Ephemeral
                })
            }

            const embed = new packages.Discord.EmbedBuilder()
                .setTitle('Coastline State Support System')
                .setColor('Red')
                .setDescription('To get support from one of our staff members use one of the following:')
                .setFields([
                    { name: 'General Support', value: 'Get support for any topics that you may have questions about.' },
                    { name: 'Advertisements', value: 'Talk with a staff members about getting your advertisement in the server.' },
                    { name: 'Reports', value: 'Report a user that is violating the server rules.' }
                ])

            const SelectMenus = new packages.Discord.StringSelectMenuBuilder()
                .setCustomId('Tickets-Create')
                .setPlaceholder('Click here to make a ticket!')
                .addOptions(
                    new packages.Discord.StringSelectMenuOptionBuilder()
                    .setLabel('General Support')
                    .setValue('General Support')
                    .setDescription('Get general support from a staff member'),
                    new packages.Discord.StringSelectMenuOptionBuilder()
                    .setLabel('Advertisements')
                    .setValue('Advertisements')
                    .setDescription('Get your advertisement posted in the server'),
                    new packages.Discord.StringSelectMenuOptionBuilder()
                    .setLabel('Reports')
                    .setValue('Reports')
                    .setDescription('Report a user'),
                )
            
            const ActionRow = new packages.Discord.ActionRowBuilder()
                .addComponents(SelectMenus)

            const channel = await interaction.guild.channels.cache.get(configs.JSON.channel.tickets.channel)

            await channel.send({
                embeds: [embed],
                components: [ActionRow]
            })

            await interaction.reply({
                content: 'Success!, the message has been posted successfully',
                flags: packages.Discord.MessageFlags.Ephemeral
            })
                
        } catch (error) {
            console.log(error)
        }
    }
}