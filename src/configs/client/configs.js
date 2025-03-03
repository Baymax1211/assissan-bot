import { packages } from '../packages.js'

/**
 * 
 * @returns {Array} - Returns all the enabled client intents
 */
export function ClientIntents() {

      // Map through the available client intents
      const intents = Object.keys(packages.Discord.GatewayIntentBits)
            .map((intent) => {
                  return packages.Discord.GatewayIntentBits[intent]
            })

      // Return all of the enabled client intents
      return intents;
}

/**
 * 
 * @returns {Array} - Returns all the enabled client partials
 */
export function ClientPartials() {

      // Map through the available partials
      const partials = Object.keys(packages.Discord.Partials).map((key) => {
            return packages.Discord.Partials[key];
      });

      // Return all of the enabled partials
      return partials;
}