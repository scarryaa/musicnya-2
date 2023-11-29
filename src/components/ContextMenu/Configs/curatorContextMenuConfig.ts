import { curatorContextMenu } from '../ContextMenuTypes/CuratorContextMenu'

export const curatorContextMenuConfig = {
  createInitialMenuItems: (id: string) => curatorContextMenu(id),
  createMenuItems: (id: string) => curatorContextMenu(id)
}
