import {
  IconDefinition,
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
import { MenuItem } from '../../types/newContextMenu'
import { Accessor } from 'solid-js'

const { closeSubContextMenu } = useSubContextMenuState()

export const createDivider = () => {
  return {
    label: 'divider',
    isQuickAction: false
  }
}

export const createViewMenuItem = (
  callback: (view: string) => void,
  label: string,
  view: string,
  quickAction = false,
  icon?: IconDefinition,
  active?: boolean | Accessor<boolean>
) => {
  return {
    icon,
    label,
    action: () => callback(view),
    onMouseEnter: () => {},
    isQuickAction: quickAction,
    active
  }
}

const createMenuItem = (
  icon: IconDefinition,
  action: () => Promise<void> | void,
  label: string,
  quickAction = false,
  hasSubMenu = false,
  disabled = false,
  tooltip?: string
): MenuItem => {
  return {
    icon,
    action,
    isQuickAction: quickAction,
    label,
    hasSubMenu,
    disabled,
    onMouseEnter: () => closeSubContextMenu(),
    tooltip
  }
}

const createAsyncMenuItem = (
  icon: IconDefinition,
  asyncAction: () => Promise<void>,
  label: string,
  disabled = false,
  quickAction = false,
  tooltip?: string
) => {
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
    disabled,
    onMouseEnter: () => closeSubContextMenu(),
    tooltip
  }
}

// Actions
export const contextMenuItems: Record<
  string,
  (
    id: string,
    type: MusicKit.MediaItemType,
    ...additionalParams: [{ [key: string]: boolean }]
  ) => MenuItem
> = {
  immersive: () => createMenuItem(faUpRightAndDownLeftFromCenter, () => {}, 'Immersive'),
  miniPlayer: () =>
    createMenuItem(faWindowMaximize, Utils.resizeToMiniPlayer, 'Mini Player'),
  share: (id: string, type: MusicKit.MediaItemType) =>
    createAsyncMenuItem(
      faShare,
      async () => {
        const data = await mkApiManager.getShareLink(id, type)
        await navigator.clipboard.writeText(data.data[0].attributes.url)
      },
      'Share'
    ),
  properties: (id: string, type: MusicKit.MediaItemType) =>
    createMenuItem(
      faInfoCircle,
      () => {
        setStore('app', 'modal', { open: true, type, id })
      },
      'Properties'
    ),
  createStation: (id: string, type: MusicKit.MediaItemType) =>
    createMenuItem(
      faSatelliteDish,
      async () => {
        await mkManager.setStationQueue(id, type)
      },
      'Create Station'
    ),
  goToArtist: (id: string, type: MusicKit.MediaItemType) =>
    createAsyncMenuItem(
      faUser,
      async () => {
        const data = await mkApiManager.getArtistFromMediaItem(id, type)
        console.log(data)
        store.app.navigate(`/media/artists/${data.data[0].id}`)
      },
      'Go to Artist'
    ),

  goToAlbum: (id: string, type: MusicKit.MediaItemType) =>
    createAsyncMenuItem(
      faRecordVinyl,
      async () => {
        const data = await mkApiManager.getAlbumFromMediaItem(id, type)
        console.log(data)
        store.app.navigate(`/media/albums/${data.data[0].id}`)
      },
      'Go to Album'
    ),

  shuffle: (id: string, type: MusicKit.MediaItemType) =>
    createMenuItem(
      faShuffle,
      async () => mkManager.processItemAndPlay(id, type, true),
      'Shuffle'
    ),

  removeFromQueue: (id: string) =>
    createMenuItem(
      faX,
      () => {
        const returnedId = mkManager.removeFromQueue(id)
        setStore('app', 'queue', {
          items: store.app.queue.items.filter(
            (item: MusicKit.MediaItem) => item.id !== returnedId
          )
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
  favoriteQuick: (id: string, type, disabled: boolean, isFavorite = false) =>
    createMenuItem(
      disabled ? faStarRegular : isFavorite ? faStar : faStarRegular,
      () =>
        isFavorite ? mkApiManager.unfavoriteArtist(id) : mkApiManager.favoriteArtist(id),
      isFavorite ? 'Unfavorite' : 'Favorite',
      true,
      false,
      disabled,
      isFavorite ? 'Unfavorite' : 'Favorite'
    ),

  createStationQuick: (id: string, type: MusicKit.MediaItemType, disabled: boolean) =>
    createMenuItem(
      faSatelliteDish,
      () => mkManager.setStationQueue(id, type),
      'Create Station',
      true,
      false,
      disabled,
      'Create Station'
    ),

  loveQuick: (
    id: string,
    type: MusicKit.MediaItemType,
    disabled: boolean,
    isLoved = false
  ) =>
    createMenuItem(
      disabled ? faHeartRegular : isLoved ? faHeart : faHeartRegular,
      () =>
        isLoved
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.favoriteItem(id, type),
      isLoved ? 'Unlove' : 'Love',
      true,
      false,
      disabled,
      isLoved ? 'Unlove' : 'Love'
    ),

  dislikeQuick: (
    id: string,
    type: MusicKit.MediaItemType,
    disabled: boolean,
    isLoved: boolean,
    isDisliked = false
  ) =>
    createMenuItem(
      disabled ? faThumbsDownRegular : isDisliked ? faThumbsDown : faThumbsDownRegular,
      () =>
        isDisliked
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.dislikeItem(id, type),
      isDisliked ? 'Undislike' : 'Dislike',
      true,
      false,
      disabled,
      isDisliked ? 'Undislike' : 'Dislike'
    ),

  addToLibraryQuick: (
    id: string,
    type: MusicKit.MediaItemType,
    disabled: boolean,
    isLoved,
    isDisliked,
    isInLibrary = false
  ) =>
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
      disabled,
      true,
      isInLibrary ? 'Remove from Library' : 'Add to Library'
    ),

  playNextQuick: (id: string, type: MusicKit.MediaItemType, disabled: boolean) =>
    createMenuItem(
      faIndent,
      () => mkManager.playNext(id, type),
      'Play Next',
      true,
      false,
      disabled,
      'Play Next'
    ),

  playLastQuick: (id: string, type: MusicKit.MediaItemType, disabled: boolean) =>
    createMenuItem(
      faOutdent,
      () => mkManager.playLater(id, type),
      'Play Last',
      true,
      false,
      disabled,
      'Play Last'
    )
}
