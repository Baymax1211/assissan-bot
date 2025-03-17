import { configs } from '../../configs/index.js'
import { packages } from '../../configs/packages.js'

export default {
    data: new packages.Discord.SlashCommandBuilder()
        .setName('ssd')
        .setDescription('Send the Server SSD Message'),
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
                .setTitle('Coastline State SSD System')
                .setColor('Red')
                .setDescription('A Server shutdown has been commenced. Everyone must not leave the ERLC Server.')
                .setFields([
                    { name: '**Shutdown By:**', value: `${interaction.user}` },
                ])
            
            const channel = await interaction.guild.channels.cache.get(configs.JSON.channel.SSU)

            await channel.send({
                content: `<@&${interaction.guild.id}>`,
                embeds: [embed],
            })

            return await interaction.reply({
                content: 'Success!, The message has been posted successfully',
                flags: packages.Discord.MessageFlags.Ephemeral
            })
                
        } catch (error) {
            console.log(error)
            await interaction.reply({
                content: 'There was an error with this command',
                flags: packages.Discord.MessageFlags.Ephemeral
            })
        }
    }
}