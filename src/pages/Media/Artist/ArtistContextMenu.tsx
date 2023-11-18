import {
  faShare,
  faInfoCircle,
  faSatelliteDish,
  faStar
} from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../../api/mkController'
import { store, setStore } from '../../../stores/store'
import { faStar as faStarSolid } from '@fortawesome/free-regular-svg-icons'

export const contextMenu = (id, type, isFavorited) => [
  {
    icon: faSatelliteDish,
    action: () => {
      mkController.setStationQueue(id)
    },
    isQuickAction: true,
    tooltip: 'Create Station',
    disabled: false
  },
  {
    icon: faStarSolid,
    action: () => {},
    isQuickAction: true,
    tooltip: 'Favorite',
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

const updateContextMenu = async (
  id,
  type,
  isFavorited,
  setIsFavorited,
  setContextMenuItems
) => {
  // Update context menu after resolving fetches
  let updatedItems = contextMenu(id, type, isFavorited())

  const isFavoritedState = await mkController.getArtist(id).then(data => {
    console.log(data)
    return data.data[0]?.attributes?.inFavorites
  })

  // Update isFavorited item
  updatedItems[1].icon = isFavoritedState ? faStar : faStarSolid
  updatedItems[1].action = () =>
    isFavoritedState
      ? mkController.unfavoriteArtist(id).then(
          res => {
            if (res) {
              setIsFavorited(false)
            }
          },
          err => {
            console.error(err)
          }
        )
      : mkController.favoriteArtist(id).then(
          res => {
            if (res) {
              setIsFavorited(true)
            }
          },
          err => {
            console.error(err)
          }
        )
  updatedItems[1].tooltip = isFavoritedState ? 'Unfavorite' : 'Favorite'
  updatedItems[1].disabled = false
  setIsFavorited(isFavoritedState)

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
  isFavorited: () => boolean,
  setIsFavorited: (value: boolean) => void,
  contextMenuItems: () => any,
  setContextMenuItems: (value: any) => void
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

  updateContextMenu(id, type, isFavorited, setIsFavorited, setContextMenuItems)
}

export const handleMoreClick = (
  e: MouseEvent,
  id: string,
  type: string,
  isFavorited: () => boolean,
  setIsFavorited: (value: boolean) => void,
  contextMenuItems: () => any,
  setContextMenuItems: (value: any) => void
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

  updateContextMenu(id, type, isFavorited, setIsFavorited, setContextMenuItems)
}
