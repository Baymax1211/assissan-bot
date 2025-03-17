import { packages } from './src/configs/packages.js';
import { configs } from './src/configs/index.js';
import { helpers } from './src/helpers/index.js';

const client = new packages.Discord.Client({
    intents: configs.client.ClientIntents(),
    partials: configs.client.ClientPartials()
});

(async () => {
    await helpers.SetEvents(
        './src/events/',
        client
    );
    
    await helpers.SetCommands(
        './src/commands/',
        client
    );
})();

(async () => {
    await client.login(process.env.CLIENT_TOKEN)

    console.log(packages.colors.green(`[Client]: The client is ready!`))
})();

// Exit handeler
process.on('SIGINT', async () => {
    await client.user.setPresence({ status: 'invisible' })
    client.destroy()
    console.log(packages.colors.red(`[Client]: The client has been killed!`));
    process.exit(0)
})