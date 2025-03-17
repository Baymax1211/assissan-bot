import { configs } from '../../configs/index.js'
import { packages } from '../../configs/packages.js'

export default {
    data: new packages.Discord.SlashCommandBuilder()
        .setName('send-application')
        .setDescription('Send the application system'),
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
                .setTitle('Coastline State Application System')
                .setColor('Red')
                .setDescription(
                    `Welcome to the Coastline State Roleplay Server! We are excited to have you here and hope to elevate your roleplaying experience. Before you begin, please take the time to familiarize yourself with our rules, strike system, and regulations. It is important to read these thoroughly. Once you have done that, please complete a server application to determine if you meet our standards. Enjoy your time roleplaying on our server, and we look forward to seeing you in action!`
                )

            
            const Button = new packages.Discord.ButtonBuilder()
                .setCustomId('application-start')
                .setLabel('Start Application')
                .setStyle(packages.Discord.ButtonStyle.Secondary)
            
            const ActionRow = new packages.Discord.ActionRowBuilder()
                .addComponents(Button)

            const channel = await interaction.guild.channels.cache.get(configs.JSON.channel.applications.main)

            await channel.send({
                embeds: [embed],
                components: [ActionRow]
            })

            return await interaction.reply({
                content: 'Success!, the message has been posted successfully',
                flags: packages.Discord.MessageFlags.Ephemeral
            })
                
        } catch (error) {
            console.log(error)
        }
    }
}