import { mkController } from '../../../api/mkController'
import { artistContextMenu } from '../ContextMenuTypes'

export const artistContextMenuConfig = {
  fetchData: async id => {
    const isFavoritedState = await mkController.getArtist(id)

    return {
      isFavorited: isFavoritedState.data[0].attributes.inFavorites
    }
  },
  createInitialMenuItems: (id, subType) => artistContextMenu(id, subType, false),
  createMenuItems: (id, subType, data) => artistContextMenu(id, subType, data.isFavorited)
}
