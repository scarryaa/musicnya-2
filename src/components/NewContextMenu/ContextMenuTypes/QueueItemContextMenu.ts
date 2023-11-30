import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types/Types'

export const queueItemContextMenu = (
  id: string,
  disabled: boolean,
  subType: string,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
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
      ContextMenuItem.CREATE_STATION,
      ContextMenuItem.GO_TO_ARTIST,
      ContextMenuItem.GO_TO_ALBUM,
      ContextMenuItem.SHARE,
      ContextMenuItem.PROPERTIES
    ],
    [disabled, isLovedState, isDislikedState, inLibraryState]
  )
}
