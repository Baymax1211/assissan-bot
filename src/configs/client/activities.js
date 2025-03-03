import { packages } from '../packages.js'

const ActivityTypes = packages.Discord.ActivityType;

// Set the list of activities
const activitiesList = [
      { name: 'The Server', type: ActivityTypes.Watching },
      { name: 'The Support Channel ', type: ActivityTypes.Watching },
      { name: 'The APIs', type: ActivityTypes.Watching },

]

// Set the interval to 10 seconds
const interval = 10 * 1000;

export const activities = {
      activitiesList,
      interval
}