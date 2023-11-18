import { platform } from '@tauri-apps/api/os'

export const TauriService = {
  getPlatformInfo: async () => {
    try {
      return await platform()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
