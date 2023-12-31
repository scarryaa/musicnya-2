import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { store } from '../stores/store'
import { useSubContextMenu } from './useSubContextMenu'
import { mkApiManager } from '../api/MkApiManager'

export const usePlaylistSubMenu = e => {
  const { openSubContextMenu } = useSubContextMenu()
  const openPlaylistSubMenu = (id, type) => {
    const playlists = store.library.playlists
      .filter(playlist => playlist.attributes.canEdit)
      .map(playlist => ({
        icon: faHeadphones,
        action: () => mkApiManager.addItemToPlaylist(id, type, playlist.id),
        label: playlist.attributes.name,
        onMouseEnter: () => {}
      }))

    openSubContextMenu(e, playlists)
  }

  return { openPlaylistSubMenu }
}
