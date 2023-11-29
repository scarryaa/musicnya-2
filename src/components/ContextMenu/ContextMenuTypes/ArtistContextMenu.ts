import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const artistContextMenu = (
  id: string,
  disabled: boolean,
  isFavoritedState: boolean
) => {
  return generateMenuItems(
    id,
    'app',
    [
      ContextMenuItem.CREATE_STATION_QUICK,
      ContextMenuItem.FAVORITE_QUICK,
      ContextMenuItem.SHARE,
      ContextMenuItem.PROPERTIES
    ],
    [disabled, isFavoritedState]
  )
}
