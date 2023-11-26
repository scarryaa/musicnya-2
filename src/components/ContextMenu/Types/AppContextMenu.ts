import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

export const appContextMenu = () => {
  return generateMenuItems(
    null,
    'app',
    [ContextMenuItem.IMMERSIVE, ContextMenuItem.MINI_PLAYER],
    []
  )
}
