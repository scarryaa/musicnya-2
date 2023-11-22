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
  faUser,
  faX
} from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faHeartRegular,
  faThumbsDown as faThumbsDownRegular,
  faStar as faStarRegular
} from '@fortawesome/free-regular-svg-icons'
import { mkController } from '../../api/mkController'
import { setStore, store } from '../../stores/store'

// Actions

export const ShareItem = (id, type) => {
  return {
    icon: faShare,
    action: async () => {
      await mkController.getShareLink(id, type).then(async data => {
        await navigator.clipboard.writeText(data.data[0].attributes.url)
      })
    },
    isQuickAction: false,
    label: 'Share',
    onMouseOver: () => {
      setStore('app', 'subContextMenu', { open: false })
    }
  }
}

export const PropertiesItem = (id, type) => {
  return {
    icon: faInfoCircle,
    action: () => {
      setStore('app', 'modal', { open: true, type, id })
    },
    isQuickAction: false,
    label: 'Properties',
    onMouseOver: () => {
      setStore('app', 'subContextMenu', { open: false })
    }
  }
}

export const CreateStationItem = (id, type) => {
  return {
    icon: faSatelliteDish,
    action: () => {
      mkController.setStationQueue(id, type)
    },
    isQuickAction: false,
    label: 'Create Station',
    disabled: false,
    onMouseOver: () => {
      setStore('app', 'subContextMenu', {
        open: false
      })
    }
  }
}

export const GoToArtistItem = (id, type) => {
  return {
    icon: faUser,
    action: async () => {
      await mkController.getArtistFromMediaItem(id, type).then(data => {
        console.log(data)
        store.app.navigate(`/media/artists/${data.data[0].id}`)
      })
    },
    isQuickAction: false,
    label: 'Go to Artist',
    onMouseOver: () => {
      setStore('app', 'subContextMenu', {
        open: false
      })
    }
  }
}

export const GoToAlbumItem = (id, type) => {
  return {
    icon: faRecordVinyl,
    action: async () => {
      await mkController.getAlbumFromMediaItem(id, type).then(data => {
        console.log(data)
        store.app.navigate(`/media/albums/${data.data[0].id}`)
      })
    },
    isQuickAction: false,
    label: 'Go to Album',
    onMouseOver: () => {
      setStore('app', 'subContextMenu', {
        open: false
      })
    }
  }
}

export const ShuffleItem = (id, type) => {
  return {
    icon: faShuffle,
    action: () => {
      mkController.shufflePlayMediaItem(id, type)
    },
    isQuickAction: false,
    label: 'Shuffle',
    onMouseOver: () => {
      setStore('app', 'subContextMenu', {
        open: false
      })
    }
  }
}

export const RemoveFromQueueItem = (id, type) => {
  return {
    icon: faX,
    action: () => {
      mkController.removeFromQueue(id)
    },
    isQuickAction: false,
    disabled: false,
    label: 'Remove from Queue'
  }
}

export const AddToPlaylistItem = (id, type) => {
  return {
    icon: faHeadphones,
    isQuickAction: false,
    label: 'Add to Playlist',
    hasSubMenu: true,
    onMouseOver: () => {
      const playlists = store.library.playlists
        .filter(playlist => playlist.attributes.canEdit)
        .map(playlist => {
          return {
            icon: faHeadphones,
            action: () => {
              mkController.addToPlaylist(id, type, playlist.id)
            },
            isQuickAction: false,
            label: playlist.attributes.name,
            onMouseOver: () => {
              setStore('app', 'subContextMenu', {
                open: true,
                id: id,
                type: type
              })
            }
          }
        })

      setStore('app', 'subContextMenu', {
        x: 0,
        y: 35,
        items: playlists,
        open: true,
        id: id,
        type: type
      })
    }
  }
}

// Quick actions

export const FavoriteQuickItem = (id, type, disabled, isFavorite = false) => {
  return {
    icon: disabled ? faStarRegular : isFavorite ? faStar : faStarRegular,
    action: () => {
      isFavorite ? mkController.unfavoriteArtist(id) : mkController.favoriteArtist(id)
    },
    isQuickAction: true,
    tooltip: isFavorite ? 'Unfavorite' : 'Favorite',
    disabled: disabled
  }
}

export const CreateStationQuickItem = (id, type) => {
  return {
    icon: faSatelliteDish,
    action: () => {
      mkController.setStationQueue(id, type)
    },
    isQuickAction: true,
    tooltip: 'Create Station'
  }
}

export const LoveQuickItem = (id, type, disabled, isLoved = false) => {
  return {
    icon: disabled ? faHeartRegular : isLoved ? faHeart : faHeartRegular,
    action: () => {
      isLoved ? mkController.unlove(id, type) : mkController.love(id, type)
    },
    isQuickAction: true,
    tooltip: isLoved ? 'Unlove' : 'Love',
    disabled: disabled
  }
}

export const DislikeQuickItem = (id, type, disabled, isDisliked = false) => {
  return {
    icon: disabled
      ? faThumbsDownRegular
      : isDisliked
      ? faThumbsDown
      : faThumbsDownRegular,
    action: () => {
      isDisliked ? mkController.unlove(id, type) : mkController.dislike(id, type)
    },
    isQuickAction: true,
    tooltip: isDisliked ? 'Undislike' : 'Dislike',
    disabled: disabled
  }
}

// TODO fix case when removing from lib, and album is in library, and isnt of library album type
export const AddToLibraryQuickItem = (id, type, disabled, isInLibrary = false) => {
  return {
    icon: disabled ? faPlus : isInLibrary ? faMinus : faPlus,
    action: () => {
      isInLibrary
        ? mkController.removeFromLibrary(id, type)
        : mkController.addToLibrary(id, type)
    },
    isQuickAction: true,
    tooltip: isInLibrary ? 'Remove from Library' : 'Add to Library',
    disabled: disabled
  }
}

export const PlayNextQuickItem = (id, type) => {
  return {
    icon: faIndent,
    action: () => {
      mkController.playNext(id, type)
    },
    isQuickAction: true,
    tooltip: 'Play Next'
  }
}

export const PlayLastQuickItem = (id, type) => {
  return {
    icon: faOutdent,
    action: () => {
      mkController.playLater(id, type)
    },
    isQuickAction: true,
    tooltip: 'Play Last'
  }
}
