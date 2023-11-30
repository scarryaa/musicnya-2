import { mkApiManager } from '../../../api/MkApiManager'
import { Reaction } from '../../../types/types'
import { queueItemContextMenu } from '../ContextMenuTypes/QueueItemContextMenu'
import { MenuItemData } from '../../ContextMenu/Types/MenuItemData'

export const queueItemContextMenuConfig = {
  fetchData: async (id: string, subType: MusicKit.MediaItemType) => {
    const [inLibraryState, isLovedState] = await Promise.all([
      mkApiManager.isItemInLibrary(id, subType),
      mkApiManager.isItemFavorite(id, subType)
    ])

    return {
      inLibrary: inLibraryState.data[0].attributes.inLibrary,
      isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
      isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
    }
  },
  createInitialMenuItems: (id: string, subType: MusicKit.MediaItemType) =>
    queueItemContextMenu(id, true, subType, false, false, false),
  createMenuItems: (id: string, subType: MusicKit.MediaItemType, data: MenuItemData) =>
    queueItemContextMenu(
      id,
      false,
      subType,
      data.isLoved,
      data.isDisliked,
      data.inLibrary
    )
}
