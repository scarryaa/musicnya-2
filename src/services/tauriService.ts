import { platform } from '@tauri-apps/api/os'
import { LogicalSize, appWindow } from '@tauri-apps/api/window'
import { localStorageService } from './localStorageService'

const MINI_PLAYER_SIZE = new LogicalSize(325, 325)

export const tauriService = {
  getPlatformInfo: async () => {
    try {
      return await platform()
    } catch (error) {
      console.error(error)
      return null
    }
  },

  resizeToMiniPlayer: async () => {
    // save current window size
    const currentSize = await appWindow.outerSize().catch(console.error)
    localStorageService.set('savedWindowSize', currentSize)

    // resize to mini player and disable resizing
    await appWindow.setResizable(false)
    appWindow.setSize(MINI_PLAYER_SIZE).catch(console.error)
  },

  resizeToSavedSize: async savedSize => {
    // resize to saved size and enable resizing
    await appWindow.setResizable(true)
    appWindow.setSize(savedSize).catch(console.error)
  }
}
