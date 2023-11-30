import { MenuItemConfig } from '../Helpers/ContextMenuHelpers'

export type ContextMenuConfig = {
  createInitialMenuItems: () => MenuItemConfig[]
  fetchData: (
    id: string,
    subtype: MusicKit.MediaItemType
  ) => { inLibrary: boolean; isLoved: boolean; isDisliked: boolean }
  createMenuItems: (
    id: string,
    subtype: MusicKit.MediaItemType,
    data: { inLibrary: boolean; isLoved: boolean; isDisliked: boolean }
  ) => MenuItemConfig[]
}
