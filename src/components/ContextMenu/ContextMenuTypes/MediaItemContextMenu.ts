import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const mediaItemContextMenu = (
  id: string,
  disabled: boolean,
  subType: string,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const additionalParams = [disabled, isLovedState, isDislikedState, inLibraryState]

  switch (subType) {
    case 'stations':
      return generateMenuItems(
        id,
        subType,
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
        subType,
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
    case 'albums':
    case 'library-albums':
      return generateMenuItems(
        id,
        subType,
        [
          ContextMenuItem.ADD_TO_LIBRARY_QUICK,
          ContextMenuItem.LOVE_QUICK,
          ContextMenuItem.DISLIKE_QUICK,
          ContextMenuItem.PLAY_NEXT_QUICK,
          ContextMenuItem.PLAY_LAST_QUICK,
          ContextMenuItem.ADD_TO_PLAYLIST,
          ContextMenuItem.GO_TO_ARTIST,
          ContextMenuItem.SHUFFLE,
          ContextMenuItem.SHARE,
          ContextMenuItem.PROPERTIES
        ],
        additionalParams
      )
    default:
      return generateMenuItems(
        id,
        subType,
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
  }
}
