import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { setStore, store } from '../stores/store'
import { mkController } from '../api/mkController'
import { useSubContextMenu, useSubContextMenuState } from './useSubContextMenu'

export const usePlaylistSubMenu = e => {
  const { openSubContextMenu } = useSubContextMenu()
  const openPlaylistSubMenu = (id, type) => {
    const playlists = store.library.playlists
      .filter(playlist => playlist.attributes.canEdit)
      .map(playlist => ({
        icon: faHeadphones,
        action: () => mkController.addToPlaylist(id, type, playlist.id),
        label: playlist.attributes.name,
        onMouseEnter: () => {}
      }))

    openSubContextMenu(e, playlists)
  }

  return { openPlaylistSubMenu }
}
