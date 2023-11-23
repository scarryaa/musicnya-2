import { AutoClient } from 'discord-auto-rpc'

export const discordService = {
  init: async () => {
    fetch('http://localhost:6729/api/discord/init', {
      method: 'POST'
    }).then(res => res)
  },

  setActivity: async ({
    details,
    state,
    largeImageKey,
    largeImageText,
    instance,
    startTimestamp,
    endTimestamp
  }) => {
    fetch('http://localhost:6729/api/discord/setActivity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        details: details,
        state: state,
        largeImageKey: largeImageKey,
        largeImageText: largeImageText,
        instance: instance,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
      })
    }).then(res => res)
  },

  clearActivity: async () => {
    fetch('http://localhost:6729/api/discord/clearActivity', {
      method: 'POST'
    }).then(res => res)
  }
}
