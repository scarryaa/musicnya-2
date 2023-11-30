import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types/Types'

export const appContextMenu = () => {
  return generateMenuItems(
    null,
    'app',
    [ContextMenuItem.IMMERSIVE, ContextMenuItem.MINI_PLAYER],
    []
  )
}
