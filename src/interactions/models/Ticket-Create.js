import { packages } from '../../configs/packages.js'

export default {
    customId: 'Ticket-Create',
    async execute(interaction, data) {
        console.log(interaction.fields)
        console.log(interaction.fields.fields.toJSON())
    }
}