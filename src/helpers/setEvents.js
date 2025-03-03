import { packages }  from '../configs/packages.js'
import { fileURLToPath } from 'url'; // Import 'fileURLToPath' from 'url'
import { URL } from 'url';  // Import URL to help with the conversion

/**
 * 
 * @param {string} Path The path to the event folder 
 * @param {*} client The Discord Client
 */
export async function SetEvents(Path, client) {
    const LoadedEvents = [];
    const EventDir = packages.fs.readdirSync(
        Path
    );

    for (const eventFolder of EventDir) {
        const folderPath = packages.path.join(Path, eventFolder)
        const eventFiles = packages.fs.readdirSync(folderPath);

        for (const file of eventFiles) {
            const fullPath = packages.path.join(folderPath, file);
            const stat = packages.fs.statSync(fullPath);

            if (stat.isDirectory()) {
                const subItems = packages.fs.readdirSync(fullPath);

                for (const subItem of subItems) {
                      const subFullPath = packages.path.join(fullPath, subItem);
                      const subStat = packages.fs.statSync(subFullPath);

                      if (subStat.isFile() && subItem.endsWith('.js')) {
                            loadEvent(subFullPath, subItem, eventFolder, client, LoadedEvents);
                      }
                }
          } else if (file.endsWith('.js')) {
                loadEvent(fullPath, file, eventFolder, client, LoadedEvents);
          }
        }
    }

    return LoadedEvents;
}

/**
 * A helper function to load events
 * @param {*} fullPath 
 * @param {*} item 
 * @param {*} eventType 
 * @param {*} client 
 * @returns 
 */
const loadEvent = async (fullPath, item, eventType, client, LoadedEvents) => {
   // Resolve the file path
   const cmdPath = packages.path.resolve(packages.path.join(fullPath));

   // Normalize the path to ensure proper file resolution
   const normalizedPath = cmdPath.replace(/\\/g, '/'); // Normalize Windows paths

   // Convert to file:// URL format
   const fileURL = new URL(`file://${normalizedPath}`);
    const { default: event } = await import(fileURL);
    
    // Check if the event has a name and an execute function
    if (event.name && typeof event.execute === 'function') {
        // Check if the event is enabled
        if (event.enabled !== true) {
            console.log(packages.colors.magenta(`[Event Loader]: Event ${item} not loaded. Event Disabled`));
            return;
        }

        // Add the event to the client
        if (event.once === true) {
            client.once(eventType, (...args) => event.execute(...args, client));
        } else {
            client.on(eventType, (...args) => event.execute(...args, client));
        }

        // Add the event to LoadedEvents folder (or array)
        LoadedEvents.push({
            name: event.name,
            eventType: eventType,
            file: item,
            path: fullPath
        });

        console.log(packages.colors.green(`[Event Loader]: Event ${event.name} successfully loaded.`));
    } else {
        console.log(packages.colors.red(`[Event Loader]: Failed to load the ${item} event, no function found`));
    }
};