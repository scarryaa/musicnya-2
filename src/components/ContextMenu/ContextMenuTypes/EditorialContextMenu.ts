import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const editorialContextMenu = (
  id: string,
  disabled: boolean,
  subType: string,
  isLovedState: boolean,
  isDislikedState: boolean,
  inLibraryState: boolean
) => {
  console.log(subType)
  switch (subType) {
    case 'curators':
      return generateMenuItems(
        id,
        subType,
        [ContextMenuItem.SHARE, ContextMenuItem.PROPERTIES],
        [disabled]
      )
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
        [disabled, isLovedState, isDislikedState, inLibraryState]
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
        [disabled, isLovedState, isDislikedState, inLibraryState]
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
          ContextMenuItem.GO_TO_ARTIST,
          ContextMenuItem.SHUFFLE,
          ContextMenuItem.SHARE,
          ContextMenuItem.PROPERTIES
        ],
        [disabled, isLovedState, isDislikedState, inLibraryState]
      )
  }
}
