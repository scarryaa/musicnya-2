import { ContextMenuType } from '../../../types/types'
import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types/Types'

export const appContextMenu = () => {
  return generateMenuItems(
    Math.random().toString(),
    ContextMenuType.App,
    [ContextMenuItem.IMMERSIVE, ContextMenuItem.MINI_PLAYER],
    []
  )
}
