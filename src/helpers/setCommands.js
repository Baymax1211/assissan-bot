import { packages } from '../configs/packages.js';
import { fileURLToPath } from 'url'; // Import 'fileURLToPath' from 'url'

/**
 * 
 * @param {string} Path The path to the commands folder 
 * @param {*} client The Discord Client
 */
export async function SetCommands(Path, client) {
    console.log(packages.colors.green("[Commands Loader]: Starting command loading process"));

    client.commands = [];
    client.commandsData = [];

    const CommandsDir = packages.fs.readdirSync(Path);
    console.log(packages.colors.blue(`[Commands Loader]: Found ${CommandsDir.length} directories in the commands folder`));

    // Loop through the command folders
    for (const cmdFolder of CommandsDir) {
        console.log(packages.colors.yellow(`[Commands Loader]: Processing folder ${cmdFolder}`));

        const commandFiles = packages.fs.readdirSync(packages.path.join(Path, cmdFolder))
            .filter(file => file.endsWith('.js'));

        console.log(packages.colors.blue(`[Commands Loader]: Found ${commandFiles.length} JS command files in ${cmdFolder}`));

        // Loop through the command files
        for (const file of commandFiles) {
            console.log(packages.colors.cyan(`[Commands Loader]: Importing command file: ${file}`));

            // Resolve the file path
            const cmdPath = packages.path.resolve(packages.path.join(Path, cmdFolder, file));

            // Normalize the path to ensure proper file resolution
            const normalizedPath = cmdPath.replace(/\\/g, '/'); // Normalize Windows paths

            // Convert to file:// URL format
            const fileURL = new URL(`file://${normalizedPath}`);

            // Import the command dynamically
            try {
                const { default: command } = await import(fileURL);

                if (command.data.name && typeof command.execute === 'function') {
                    // Push the command to the commands array
                    client.commands.push({
                        name: command.data.name,
                        execute: command.execute
                    });
                    client.commandsData.push(command.data.toJSON());
                    console.log(packages.colors.green(`[Commands Loader]: Successfully added ${file} to commands`));
                } else {
                    console.log(packages.colors.red(`[Commands Loader]: Failed to add ${file} to the array, no name or function found`));
                }
            } catch (error) {
                console.log(packages.colors.red(`[Commands Loader]: Failed to import ${file}\nError: ${error.message}`));
            }
        }
    }

    console.log(packages.colors.green(`[Commands Loader]: Finished loading commands`));
    console.log(packages.colors.blue(`[Commands Loader]: Total commands loaded: ${client.commands.length}`));

    try {
        // Set the Discord REST System
        const rest = new packages.Discord.REST({
            version: '10'
        }).setToken(process.env.CLIENT_TOKEN);

        await rest.put(
            packages.Discord.Routes.applicationCommands(process.env.CLIENT_ID), {
                body: client.commandsData
            },
        );

        console.log(packages.colors.green(`[Commands Loader]: All slash commands are loaded!`));

    } catch (error) {
        console.log(packages.colors.red(`[Commands Loader]: Failed to load slash commands!\n\nReason:\n${error.message}`));
    }
}
