import { curatorContextMenu } from '../Types/CuratorContextMenu'

export const curatorContextMenuConfig = {
  createInitialMenuItems: (id: string) => curatorContextMenu(id),
  createMenuItems: (id: string) => curatorContextMenu(id)
}
