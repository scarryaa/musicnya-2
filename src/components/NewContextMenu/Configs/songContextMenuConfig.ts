import { mkApiManager } from '../../../api/MkApiManager'
import { Reaction } from '../../../types/types'
import { songContextMenu } from '../ContextMenuTypes/SongContextMenu'
import { MenuItemData } from '../../ContextMenu/Types/MenuItemData'

export const songContextMenuConfig = {
  fetchData: async (id: string, subType: MusicKit.MediaItemType) => {
    const [inLibraryState, isLovedState] = await Promise.all([
      mkApiManager.isItemInLibrary(id, subType),
      mkApiManager.isItemFavorite(id, subType)
    ])

    return {
      inLibrary: inLibraryState.data?.[0]?.attributes?.inLibrary,
      isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
      isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
    }
  },
  createInitialMenuItems: (id: string) => songContextMenu(id, true, false, false, false),
  createMenuItems: (id: string, subType: MusicKit.MediaItemType, data: MenuItemData) =>
    songContextMenu(id, false, data.isLoved, data.isDisliked, data.inLibrary)
}
