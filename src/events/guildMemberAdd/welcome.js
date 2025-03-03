import { packages } from "../../configs/packages.js";
import { configs } from '../../configs/index.js'

export default {
	name: 'Welcome System',
	description: 'Welcome system to server',
	enabled: true,
	once: false,
	async execute(member) {
		try {
			const Embed = new packages.Discord.EmbedBuilder()
                .setTitle('Welcome to the Server')
                .setColor('Red')
                .setDescription(`<@${member.user.id}> Welcome to ${member.guild.name}.\n To get started please head over to <#${configs.JSON.channel.applications.main}>!`)
                .setThumbnail(member.user.displayAvatarURL())
                .setTimestamp()

            const channel = await member.guild.channels.cache.get(configs.JSON.channel.welcome)
            
            // Send the message
            await channel.send({
                content: `<@${member.user.id}>`,
                embeds: [Embed]
            });
            
        } catch (error) {
			console.error(error);
		}
	},
};