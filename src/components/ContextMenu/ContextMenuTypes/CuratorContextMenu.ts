import { generateMenuItems } from '../Helpers/ContextMenuHelpers'
import { ContextMenuItem } from '../Types'

//TODO fix the share link
export const curatorContextMenu = (id: string) => {
  return generateMenuItems(
    id,
    'curators',
    [ContextMenuItem.SHARE, ContextMenuItem.PROPERTIES],
    []
  )
}
