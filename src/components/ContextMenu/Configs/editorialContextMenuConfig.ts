import { mkApiManager } from '../../../api/MkApiManager'
import { Reaction } from '../../../types/types'
import { editorialContextMenu } from '../ContextMenuTypes/EditorialContextMenu'
import { MenuItemData } from '../Types/MenuItemData'

export const editorialContextMenuConfig = {
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
  createInitialMenuItems: (id: string, subType: MusicKit.MediaItemType) =>
    editorialContextMenu(id, true, subType, false, false, false),
  createMenuItems: (id: string, subType: MusicKit.MediaItemType, data: MenuItemData) =>
    editorialContextMenu(
      id,
      false,
      subType,
      data.isLoved,
      data.isDisliked,
      data.inLibrary
    )
}
