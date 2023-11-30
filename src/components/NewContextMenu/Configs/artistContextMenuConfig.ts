import { mkApiManager } from '../../../api/MkApiManager'
import { artistContextMenu } from '../ContextMenuTypes/ArtistContextMenu'
import { MenuItemData } from '../../ContextMenu/Types/MenuItemData'

export const artistContextMenuConfig = {
  fetchData: async (id: string) => {
    const isFavoritedState = await mkApiManager.getArtist(id)

    return {
      isFavorited: isFavoritedState.data[0].attributes.inFavorites as boolean
    }
  },
  createInitialMenuItems: (id: string) => artistContextMenu(id, true, false),
  createMenuItems: (id: string, subType: string, data: MenuItemData) =>
    artistContextMenu(id, false, data.isFavorited)
}
