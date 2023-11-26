import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const historyItemContextMenu = (
  id: string,
  subtype: string,
  disabled: boolean,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const additionalParams = [disabled, isLovedState, isDislikedState, inLibraryState]
  switch (subtype) {
    case 'stations':
      return generateMenuItems(
        id,
        subtype,
        [
          ContextMenuItem.LOVE_QUICK,
          ContextMenuItem.DISLIKE_QUICK,
          ContextMenuItem.SHARE,
          ContextMenuItem.PROPERTIES
        ],
        additionalParams
      )
    case 'playlists':
      return generateMenuItems(
        id,
        subtype,
        [
          ContextMenuItem.ADD_TO_LIBRARY_QUICK,
          ContextMenuItem.LOVE_QUICK,
          ContextMenuItem.DISLIKE_QUICK,
          ContextMenuItem.PLAY_NEXT_QUICK,
          ContextMenuItem.PLAY_LAST_QUICK,
          ContextMenuItem.ADD_TO_PLAYLIST,
          ContextMenuItem.SHUFFLE,
          ContextMenuItem.SHARE,
          ContextMenuItem.PROPERTIES
        ],
        additionalParams
      )
    default:
      return generateMenuItems(
        id,
        subtype,
        [
          ContextMenuItem.ADD_TO_LIBRARY_QUICK,
          ContextMenuItem.LOVE_QUICK,
          ContextMenuItem.DISLIKE_QUICK,
          ContextMenuItem.PLAY_NEXT_QUICK,
          ContextMenuItem.PLAY_LAST_QUICK,
          ContextMenuItem.ADD_TO_PLAYLIST,
          ContextMenuItem.CREATE_STATION,
          ContextMenuItem.GO_TO_ARTIST,
          ContextMenuItem.GO_TO_ALBUM,
          ContextMenuItem.SHARE,
          ContextMenuItem.PROPERTIES
        ],
        additionalParams
      )
  }
}
