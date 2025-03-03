import { packages } from '../../configs/packages.js'

export default {
    data: new packages.Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get the ping of the bot'),
    async execute(interaction) {
        try {
            await interaction.reply({ 
                content: 'Pinging...'            
            });
            
            // Get the websocket ping
            const websocketPing = Math.round(interaction.client.ws.ping)

            // Get the message latency
            const messageLatency = Date.now() - interaction.createdTimestamp

            // Set a embed
            const embed = new packages.Discord.EmbedBuilder()
                .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
                .setFooter({ text: `Latency Recorded`, iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp()
                .addFields(
                    {
                        name: `**Discord Latency:**`,
                        value: `\`\`\`${websocketPing}ms\`\`\``,
                    },
                    {
                        name: `**API Latency:**`,
                        value: `\`\`\`${messageLatency}ms\`\`\``,
                    }
                );

            await interaction.editReply({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}