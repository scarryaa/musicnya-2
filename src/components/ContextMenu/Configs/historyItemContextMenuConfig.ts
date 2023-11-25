import { mkApiManager } from '../../../api/MkApiManager'
import { mkController } from '../../../api/mkController'
import { Reaction } from '../../../types/types'
import { historyItemContextMenu } from '../ContextMenuTypes'

export const historyItemContextMenuConfig = {
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
    historyItemContextMenu(id, subType, true, false, false, false),
  createMenuItems: (id, subType, data) =>
    historyItemContextMenu(
      id,
      subType,
      false,
      data.isLoved,
      data.isDisliked,
      data.inLibrary
    )
}
