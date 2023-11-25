import { mkApiManager } from '../../../api/MkApiManager'
import { mkController } from '../../../api/mkController'
import { Reaction } from '../../../types/types'
import { queueItemContextMenu } from '../ContextMenuTypes'

export const queueItemContextMenuConfig = {
  fetchData: async (id, subType) => {
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
  createInitialMenuItems: (id, subType) =>
    queueItemContextMenu(id, true, subType, false, false, false),
  createMenuItems: (id, subType, data) =>
    queueItemContextMenu(
      id,
      false,
      subType,
      data.isLoved,
      data.isDisliked,
      data.inLibrary
    )
}
