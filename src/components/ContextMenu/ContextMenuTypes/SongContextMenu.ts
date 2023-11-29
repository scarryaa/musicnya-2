import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const songContextMenu = (
  id: string,
  disabled,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const songType = inLibraryState ? 'library-songs' : 'songs'

  return generateMenuItems(
    id,
    songType,
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
