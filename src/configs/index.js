import { client } from './client/index.js'

import channel from './JSON/channels.json' with { type: "json" }
import permissions from './JSON/permissions.json' with { type: "json" }
import roles from './JSON/roles.json' with { type: "json" }

// Set the configs
export const configs = {
    client,
    JSON: {
        channel,
        permissions,
        roles
    }
};