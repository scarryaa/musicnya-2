import { mkApiManager } from '../../../api/MkApiManager'
import { mkController } from '../../../api/mkController'
import { Reaction } from '../../../types/types'
import { songContextMenu } from '../ContextMenuTypes'

export const songContextMenuConfig = {
  fetchData: async (id, subType) => {
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
  createInitialMenuItems: (id, subType) => songContextMenu(id, true, false, false, false),
  createMenuItems: (id, subType, data) =>
    songContextMenu(id, false, data.isLoved, data.isDisliked, data.inLibrary)
}
