import { mkApiManager } from '../../../api/MkApiManager'
import { artistContextMenu } from '../ContextMenuTypes'

export const artistContextMenuConfig = {
  fetchData: async id => {
    const isFavoritedState = await mkApiManager.getArtist(id)

    return {
      isFavorited: isFavoritedState.data[0].attributes.inFavorites
    }
  },
  createInitialMenuItems: (id, subType) => artistContextMenu(id, subType, false),
  createMenuItems: (id, subType, data) => artistContextMenu(id, subType, data.isFavorited)
}
