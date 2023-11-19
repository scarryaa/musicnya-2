import { faHeart, faThumbsDown, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faPlus,
  faIndent,
  faOutdent,
  faHeadphones,
  faShuffle,
  faShare,
  faInfoCircle,
  faMinus,
  faHeart as faHeartSolid,
  faThumbsDown as faThumbsDownSolid,
  faSatelliteDish,
  faX
} from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { store, setStore } from '../../stores/store'

export const contextMenu = (id, type, isLoved, inLibrary, isDisliked, index) =>
  type.includes('stations')
    ? [
        {
          icon: faHeart,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Love',
          disabled: true
        },
        {
          icon: faThumbsDown,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Dislike',
          disabled: true
        },
        {
          icon: faShare,
          action: async () => {
            await mkController.getShareLink(id, type).then(async data => {
              await navigator.clipboard.writeText(data.data[0].attributes.url)
            })
          },
          isQuickAction: false,
          label: 'Share',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        },
        {
          icon: faInfoCircle,
          action: () => {
            console.log('last')
          },
          isQuickAction: false,
          label: 'Properties',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        }
      ]
    : type.includes('playlists')
    ? [
        {
          icon: faPlus,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Add to Library',
          disabled: true
        },
        {
          icon: faHeart,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Love',
          disabled: true
        },
        {
          icon: faThumbsDown,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Dislike',
          disabled: true
        },
        {
          icon: faIndent,
          action: () => {
            mkController.playNext(id, type)
          },
          isQuickAction: true,
          tooltip: 'Play Next'
        },
        {
          icon: faOutdent,
          action: () => {
            mkController.playLater(id, type)
          },
          isQuickAction: true,
          tooltip: 'Play Last'
        },
        {
          icon: faHeadphones,
          isQuickAction: false,
          label: 'Add to Playlist',
          hasSubMenu: true,
          onMouseOver: () => {
            const playlists = store.libraryPlaylists
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
        },
        {
          icon: faShare,
          action: async () => {
            await mkController.getShareLink(id, type).then(async data => {
              await navigator.clipboard.writeText(data.data[0].attributes.url)
            })
          },
          isQuickAction: false,
          label: 'Share',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        },
        {
          icon: faInfoCircle,
          action: () => {
            console.log('last')
          },
          isQuickAction: false,
          label: 'Properties',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        }
      ]
    : [
        {
          icon: faPlus,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Add to Library',
          disabled: true
        },
        {
          icon: faHeart,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Love',
          disabled: true
        },
        {
          icon: faThumbsDown,
          action: () => {},
          isQuickAction: true,
          tooltip: 'Dislike',
          disabled: true
        },
        {
          icon: faIndent,
          action: () => {
            mkController.playNext(id, type)
          },
          isQuickAction: true,
          tooltip: 'Play Next'
        },
        {
          icon: faOutdent,
          action: () => {
            mkController.playLater(id, type)
          },
          isQuickAction: true,
          tooltip: 'Play Last'
        },
        {
          icon: faHeadphones,
          isQuickAction: false,
          label: 'Add to Playlist',
          hasSubMenu: true,
          onMouseOver: () => {
            const playlists = store.libraryPlaylists
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
        },
        {
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
        },
        {
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
        },
        {
          icon: faUser,
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
        },
        {
          icon: faShare,
          action: async () => {
            await mkController.getShareLink(id, type).then(async data => {
              await navigator.clipboard.writeText(data.data[0].attributes.url)
            })
          },
          isQuickAction: false,
          label: 'Share',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        },
        {
          icon: faInfoCircle,
          action: () => {
            console.log('last')
          },
          isQuickAction: false,
          label: 'Properties',
          onMouseOver: () => {
            setStore('app', 'subContextMenu', {
              open: false
            })
          }
        }
      ]

const updateContextMenu = async (
  id,
  type,
  isLoved,
  inLibrary,
  isDisliked,
  setContextMenuItems,
  setInLibrary,
  setIsLoved,
  setIsDisliked,
  index
) => {
  // Update context menu after resolving fetches
  let updatedItems = contextMenu(id, type, isLoved(), inLibrary(), isDisliked(), index)

  const inLibraryState = type.includes('library')
    ? true
    : await mkController
        .checkIfInLibrary(id, type)
        .then(data => data.data[0]?.attributes?.inLibrary)

  if (type.includes('stations')) {
    const isLovedState = await mkController
      .checkIfLoved(id, type)
      .then(data => data.data[0]?.attributes?.value === 1)

    updatedItems[0].icon = isLovedState ? faHeartSolid : faHeart
    updatedItems[0].action = () =>
      isLovedState ? mkController.unlove(id, type) : mkController.love(id, type)
    updatedItems[0].tooltip = isLovedState ? 'Unlove' : 'Love'
    updatedItems[0].disabled = false
    setIsLoved(isLovedState)
    isLovedState ? setIsDisliked(false) : setIsDisliked(isDisliked())

    const isDislikedState = await mkController
      .checkIfLoved(id, type)
      .then(data => data.data[0]?.attributes?.value === -1)

    // Update isDisliked item
    updatedItems[1].icon = isDislikedState ? faThumbsDownSolid : faThumbsDown
    updatedItems[1].action = () =>
      isDislikedState ? mkController.unlove(id, type) : mkController.dislike(id, type)
    updatedItems[1].tooltip = isDislikedState ? 'Undislike' : 'Dislike'
    updatedItems[1].disabled = false
    setIsDisliked(isDislikedState)
    isDislikedState ? setIsLoved(false) : setIsLoved(isLoved())
  } else {
    // Update inLibrary item
    updatedItems[0].icon = inLibraryState ? faMinus : faPlus
    updatedItems[0].action = () =>
      inLibraryState
        ? mkController.removeFromLibrary(id, type)
        : mkController.addToLibrary(id, type)
    updatedItems[0].tooltip = inLibraryState ? 'Remove from Library' : 'Add to Library'
    updatedItems[0].disabled = false
    setInLibrary(inLibraryState)

    const isLovedState = await mkController
      .checkIfLoved(id, type)
      .then(data => data.data[0]?.attributes?.value === 1)

    // Update isLoved item
    updatedItems[1].icon = isLovedState ? faHeartSolid : faHeart
    updatedItems[1].action = () =>
      isLovedState ? mkController.unlove(id, type) : mkController.love(id, type)
    updatedItems[1].tooltip = isLovedState ? 'Unlove' : 'Love'
    updatedItems[1].disabled = false
    setIsLoved(isLovedState)
    isLovedState ? setIsDisliked(false) : setIsDisliked(isDisliked())

    const isDislikedState = await mkController
      .checkIfLoved(id, type)
      .then(data => data.data[0]?.attributes?.value === -1)

    // Update isDisliked item
    updatedItems[2].icon = isDislikedState ? faThumbsDownSolid : faThumbsDown
    updatedItems[2].action = () =>
      isDislikedState ? mkController.unlove(id, type) : mkController.dislike(id, type)
    updatedItems[2].tooltip = isDislikedState ? 'Undislike' : 'Dislike'
    updatedItems[2].disabled = false
    setIsDisliked(isDislikedState)
    isDislikedState ? setIsLoved(false) : setIsLoved(isLoved())
  }

  // Update the context menu items state after the fetches
  setContextMenuItems(updatedItems)

  // Update the context menu in the store to reflect the new items
  setStore('app', 'contextMenu', {
    ...store.app.contextMenu,
    items: updatedItems
  })
}

export const handleContextMenu = async (
  e: MouseEvent,
  id: string,
  type: string,
  isLoved: () => boolean,
  setIsLoved: (value: boolean) => void,
  inLibrary: () => boolean,
  setInLibrary: (value: boolean) => void,
  isDisliked: () => boolean,
  setIsDisliked: (value: boolean) => void,
  contextMenuItems: () => any,
  setContextMenuItems: (value: any) => void,
  index
) => {
  // Open the context menu immediately with disabled items
  setStore('app', 'contextMenu', {
    open: true,
    x:
      e.clientX + 150 >
      (store.app.rightSidebar.isExpanded
        ? window.innerWidth - 300
        : window.innerWidth - 50)
        ? e.clientX - 160
        : e.clientX,
    y: e.clientY + 200 > window.innerHeight ? e.clientY - 200 : e.clientY,
    items: contextMenuItems(),
    id: id,
    type: type,
    display: 'block'
  })

  setStore('app', 'subContextMenu', {
    x: 0,
    y: 0,
    items: [],
    open: false,
    id: '',
    type: ''
  })

  e.preventDefault()

  updateContextMenu(
    id,
    type,
    isLoved,
    inLibrary,
    isDisliked,
    setContextMenuItems,
    setInLibrary,
    setIsLoved,
    setIsDisliked,
    index
  )
}

export const handleMoreClick = (
  e: MouseEvent,
  id: string,
  type: string,
  isLoved: () => boolean,
  setIsLoved: (value: boolean) => void,
  inLibrary: () => boolean,
  setInLibrary: (value: boolean) => void,
  isDisliked: () => boolean,
  setIsDisliked: (value: boolean) => void,
  contextMenuItems: () => any,
  setContextMenuItems: (value: any) => void,
  index
) => {
  e.preventDefault()
  e.stopPropagation()
  // Open the context menu immediately with disabled items
  setStore('app', 'contextMenu', {
    open: true,
    x:
      e.clientX + 150 >
      (store.app.rightSidebar.isExpanded
        ? window.innerWidth - 300
        : window.innerWidth - 50)
        ? e.clientX - 160
        : e.clientX,
    y: e.clientY + 200 > window.innerHeight ? e.clientY - 200 : e.clientY,
    items: contextMenuItems(),
    id: id,
    type: type,
    display: 'block'
  })

  e.preventDefault()

  updateContextMenu(
    id,
    type,
    isLoved,
    inLibrary,
    isDisliked,
    setContextMenuItems,
    setInLibrary,
    setIsLoved,
    setIsDisliked,
    index
  )
}
