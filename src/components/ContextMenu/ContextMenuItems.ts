import {
  faHeadphones,
  faHeart,
  faIndent,
  faInfoCircle,
  faMinus,
  faOutdent,
  faPlus,
  faRecordVinyl,
  faSatelliteDish,
  faShare,
  faShuffle,
  faStar,
  faThumbsDown,
  faUpRightAndDownLeftFromCenter,
  faUser,
  faX
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faHeartRegular,
  faThumbsDown as faThumbsDownRegular,
  faStar as faStarRegular,
  faWindowMaximize
} from '@fortawesome/free-regular-svg-icons'
import { setStore, store } from '../../stores/store'
import { Utils } from '../../util/util'
import { usePlaylistSubMenu } from '../../composables/usePlaylistSubMenu'
import { useSubContextMenuState } from '../../composables/useSubContextMenu'
import { mkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'

const { closeSubContextMenu } = useSubContextMenuState()

const createMenuItem = (
  icon,
  action,
  label,
  quickAction = false,
  hasSubMenu = false,
  tooltip?
) => {
  return {
    icon,
    action,
    isQuickAction: quickAction,
    label,
    hasSubMenu,
    onMouseEnter: () => closeSubContextMenu(),
    tooltip
  }
}

const createAsyncMenuItem = (icon, asyncAction, label, quickAction = false, tooltip?) => {
  return {
    icon,
    action: async () => {
      try {
        await asyncAction()
      } catch (error) {
        console.error('Error executing menu action:', error)
      }
    },
    isQuickAction: quickAction,
    label,
    onMouseEnter: () => closeSubContextMenu(),
    tooltip
  }
}

// Actions
export const contextMenuItems = {
  immersive: createMenuItem(faUpRightAndDownLeftFromCenter, () => {}, 'Immersive'),
  miniPlayer: createMenuItem(faWindowMaximize, Utils.resizeToMiniPlayer, 'Mini Player'),
  share: (id, type) =>
    createAsyncMenuItem(
      faShare,
      async () => {
        const data = await mkApiManager.getShareLink(id, type)
        await navigator.clipboard.writeText(data.data[0].attributes.url)
      },
      'Share'
    ),
  properties: (id, type) =>
    createMenuItem(
      faInfoCircle,
      () => {
        setStore('app', 'modal', { open: true, type, id })
      },
      'Properties'
    ),
  createStation: (id, type) =>
    createMenuItem(
      faSatelliteDish,
      () => {
        mkManager.setStationQueue(id, type)
      },
      'Create Station'
    ),
  goToArtist: (id, type) =>
    createAsyncMenuItem(
      faUser,
      async () => {
        const data = await mkApiManager.getArtistFromMediaItem(id, type)
        console.log(data)
        store.app.navigate(`/media/artists/${data.data[0].id}`)
      },
      'Go to Artist'
    ),

  goToAlbum: (id, type) =>
    createAsyncMenuItem(
      faRecordVinyl,
      async () => {
        const data = await mkApiManager.getAlbumFromMediaItem(id, type)
        console.log(data)
        store.app.navigate(`/media/albums/${data.data[0].id}`)
      },
      'Go to Album'
    ),

  shuffle: (id, type) =>
    createMenuItem(
      faShuffle,
      () => mkManager.processItemAndPlay(id, type, true),
      'Shuffle'
    ),

  removeFromQueue: (id, type) =>
    createAsyncMenuItem(
      faX,
      async () => {
        const returnedId = await mkManager.removeFromQueue(id)
        setStore('app', 'queue', {
          items: store.app.queue.items.filter((item: any) => item.id !== returnedId)
        })
      },
      'Remove from Queue'
    ),

  addToPlaylist: (id, type) => ({
    ...createMenuItem(faHeadphones, () => {}, 'Add to Playlist', false, true),
    onMouseEnter: e => {
      const { openPlaylistSubMenu } = usePlaylistSubMenu(e)
      openPlaylistSubMenu(id, type)
    }
  }),
  // Quick actions
  favoriteQuick: (id, type, disabled, isFavorite = false) =>
    createMenuItem(
      disabled ? faStarRegular : isFavorite ? faStar : faStarRegular,
      () =>
        isFavorite ? mkApiManager.unfavoriteArtist(id) : mkApiManager.favoriteArtist(id),
      isFavorite ? 'Unfavorite' : 'Favorite',
      true,
      false,
      isFavorite ? 'Unfavorite' : 'Favorite'
    ),

  createStationQuick: (id, type) =>
    createMenuItem(
      faSatelliteDish,
      () => mkManager.setStationQueue(id, type),
      'Create Station',
      true,
      false,
      'Create Station'
    ),

  loveQuick: (id, type, disabled, isLoved = false) =>
    createMenuItem(
      disabled ? faHeartRegular : isLoved ? faHeart : faHeartRegular,
      () =>
        isLoved
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.favoriteItem(id, type),
      isLoved ? 'Unlove' : 'Love',
      true,
      false,
      isLoved ? 'Unlove' : 'Love'
    ),

  dislikeQuick: (id, type, disabled, isLoved, isDisliked = false) =>
    createMenuItem(
      disabled ? faThumbsDownRegular : isDisliked ? faThumbsDown : faThumbsDownRegular,
      () =>
        isDisliked
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.dislikeItem(id, type),
      isDisliked ? 'Undislike' : 'Dislike',
      true,
      false,
      isDisliked ? 'Undislike' : 'Dislike'
    ),

  addToLibraryQuick: (id, type, disabled, isLoved, isDisliked, isInLibrary = false) =>
    createAsyncMenuItem(
      disabled ? faPlus : isInLibrary ? faMinus : faPlus,
      async () => {
        if (isInLibrary && id[0] !== 'l') {
          const resp = await mkApiManager.getLibraryIdFromCatalog(id, type)
          await mkApiManager.removeFromLibrary(resp.data[0].id, type)
        } else if (isInLibrary) {
          await mkApiManager.removeFromLibrary(id, type)
        } else {
          await mkApiManager.addToLibrary(id, type)
        }
      },
      isInLibrary ? 'Remove from Library' : 'Add to Library',
      true,
      isInLibrary ? 'Remove from Library' : 'Add to Library'
    ),

  playNextQuick: (id, type) =>
    createMenuItem(
      faIndent,
      () => mkManager.playNext(id, type),
      'Play Next',
      true,
      false,
      'Play Next'
    ),

  playLastQuick: (id, type) =>
    createMenuItem(
      faOutdent,
      () => mkManager.playLater(id, type),
      'Play Last',
      true,
      false,
      'Play Last'
    )
}
