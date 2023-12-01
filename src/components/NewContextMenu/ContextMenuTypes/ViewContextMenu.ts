import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types/Types'

export const viewContextMenu = () => {
  return generateMenuItems(null, 'view', [ContextMenuItem.GRID, ContextMenuItem.LIST], [])
}
