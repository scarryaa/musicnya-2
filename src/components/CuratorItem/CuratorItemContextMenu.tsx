import { faShare, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { mkController } from '../../api/mkController'
import { setStore } from '../../stores/store'

export const contextMenu = (id, type) => [
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

export const handleContextMenu = async (
  e: MouseEvent,
  id: string,
  type: string,
  contextMenuItems: () => any
) => {
  // Open the context menu immediately with disabled items
  setStore('app', 'contextMenu', {
    open: true,
    x: e.clientX,
    y: e.clientY,
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
}

export const handleMoreClick = (
  e: MouseEvent,
  id: string,
  type: string,
  contextMenuItems: () => any
) => {
  e.preventDefault()
  e.stopPropagation()
  // Open the context menu immediately with disabled items
  setStore('app', 'contextMenu', {
    open: true,
    x: e.clientX,
    y: e.clientY,
    items: contextMenuItems(),
    id: id,
    type: type,
    display: 'block'
  })

  e.preventDefault()
}
