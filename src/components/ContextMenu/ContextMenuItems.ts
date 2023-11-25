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
import { mkController } from '../../api/mkController'
import { setStore, store } from '../../stores/store'
import { Utils } from '../../util/util'
import { usePlaylistSubMenu } from '../../composables/usePlaylistSubMenu'
import { useSubContextMenuState } from '../../composables/useSubContextMenu'
import { mkManager } from '../../api/MkManager'
import { mkApiManager } from '../../api/MkApiManager'

const { closeSubContextMenu } = useSubContextMenuState()

// Actions
export const contextMenuItems = {
  immersive: {
    icon: faUpRightAndDownLeftFromCenter,
    action: () => {},
    isQuickAction: false,
    label: 'Immersive',
    disabled: false,
    onMouseEnter: () => closeSubContextMenu()
  },
  miniPlayer: {
    icon: faWindowMaximize,
    action: () => {
      Utils.resizeToMiniPlayer()
    },
    isQuickAction: false,
    label: 'Mini Player',
    disabled: false,
    onMouseEnter: () => closeSubContextMenu()
  },
  share: (id, type) => {
    return {
      icon: faShare,
      action: async () => {
        await mkApiManager.getShareLink(id, type).then(async data => {
          await navigator.clipboard.writeText(data.data[0].attributes.url)
        })
      },
      isQuickAction: false,
      label: 'Share',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  properties: (id, type) => {
    return {
      icon: faInfoCircle,
      action: () => {
        setStore('app', 'modal', { open: true, type, id })
      },
      isQuickAction: false,
      label: 'Properties',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  createStation: (id, type) => {
    return {
      icon: faSatelliteDish,
      action: () => {
        mkManager.setStationQueue(id, type)
      },
      isQuickAction: false,
      label: 'Create Station',
      disabled: false,
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  goToArtist: (id, type) => {
    return {
      icon: faUser,
      action: async () => {
        await mkApiManager.getArtistFromMediaItem(id, type).then(data => {
          console.log(data)
          store.app.navigate(`/media/artists/${data.data[0].id}`)
        })
      },
      isQuickAction: false,
      label: 'Go to Artist',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  goToAlbum: (id, type) => {
    return {
      icon: faRecordVinyl,
      action: async () => {
        await mkApiManager.getAlbumFromMediaItem(id, type).then(data => {
          console.log(data)
          store.app.navigate(`/media/albums/${data.data[0].id}`)
        })
      },
      isQuickAction: false,
      label: 'Go to Album',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  shuffle: (id, type) => {
    return {
      icon: faShuffle,
      action: () => {
        mkManager.processItemAndPlay(id, type, true)
      },
      isQuickAction: false,
      label: 'Shuffle',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  removeFromQueue: (id, type) => {
    return {
      icon: faX,
      action: async () => {
        const returnedId = await mkManager.removeFromQueue(id)
        setStore('app', 'queue', {
          items: store.app.queue.items.filter((item: any) => item.id !== returnedId)
        })
      },
      isQuickAction: false,
      disabled: false,
      label: 'Remove from Queue',
      onMouseEnter: () => closeSubContextMenu()
    }
  },
  addToPlaylist: (id, type) => {
    return {
      icon: faHeadphones,
      isQuickAction: false,
      label: 'Add to Playlist',
      hasSubMenu: true,
      onMouseEnter: e => {
        const { openPlaylistSubMenu } = usePlaylistSubMenu(e)
        openPlaylistSubMenu(id, type)
      }
    }
  },
  // Quick actions
  favoriteQuick: (id, type, disabled, isFavorite = false) => {
    return {
      icon: disabled ? faStarRegular : isFavorite ? faStar : faStarRegular,
      action: () => {
        isFavorite ? mkApiManager.unfavoriteArtist(id) : mkApiManager.favoriteArtist(id)
      },
      isQuickAction: true,
      tooltip: isFavorite ? 'Unfavorite' : 'Favorite',
      disabled: disabled
    }
  },
  createStationQuick: (id, type) => {
    return {
      icon: faSatelliteDish,
      action: () => {
        mkManager.setStationQueue(id, type)
      },
      isQuickAction: true,
      tooltip: 'Create Station'
    }
  },
  loveQuick: (id, type, disabled, isLoved = false) => {
    return {
      icon: disabled ? faHeartRegular : isLoved ? faHeart : faHeartRegular,
      action: () => {
        isLoved
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.favoriteItem(id, type)
      },
      isQuickAction: true,
      tooltip: isLoved ? 'Unlove' : 'Love',
      disabled: disabled
    }
  },
  dislikeQuick: (id, type, disabled, isLoved, isDisliked = false) => {
    console.log(isDisliked)
    return {
      icon: disabled
        ? faThumbsDownRegular
        : isDisliked
        ? faThumbsDown
        : faThumbsDownRegular,
      action: () => {
        isDisliked
          ? mkApiManager.unfavoriteItem(id, type)
          : mkApiManager.dislikeItem(id, type)
      },
      isQuickAction: true,
      tooltip: isDisliked ? 'Undislike' : 'Dislike',
      disabled: disabled
    }
  },
  addToLibraryQuick: (id, type, disabled, isLoved, isDisliked, isInLibrary = false) => {
    return {
      icon: disabled ? faPlus : isInLibrary ? faMinus : faPlus,
      action: () => {
        isInLibrary
          ? mkApiManager.removeFromLibrary(id, type)
          : mkApiManager.addToLibrary(id, type)
      },
      isQuickAction: true,
      tooltip: isInLibrary ? 'Remove from Library' : 'Add to Library',
      disabled: disabled
    }
  },
  playNextQuick: (id, type) => {
    return {
      icon: faIndent,
      action: () => {
        mkManager.playNext(id, type)
      },
      isQuickAction: true,
      tooltip: 'Play Next'
    }
  },
  playLastQuick: (id, type) => {
    return {
      icon: faOutdent,
      action: () => {
        mkManager.playLater(id, type)
      },
      isQuickAction: true,
      tooltip: 'Play Last'
    }
  }
}
