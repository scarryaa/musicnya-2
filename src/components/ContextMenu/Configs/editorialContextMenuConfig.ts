import { mkApiManager } from '../../../api/MkApiManager'
import { mkController } from '../../../api/mkController'
import { Reaction } from '../../../types/types'
import { editorialContextMenu } from '../ContextMenuTypes'

export const editorialContextMenuConfig = {
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
  createInitialMenuItems: (id, subType) =>
    editorialContextMenu(id, true, subType, false, false, false),
  createMenuItems: (id, subType, data) =>
    editorialContextMenu(
      id,
      false,
      subType,
      data.isLoved,
      data.isDisliked,
      data.inLibrary
    )
}
