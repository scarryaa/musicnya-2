import { setStore, store } from '../stores/store'

const OUT_OF_VIEW = -10000

export const useContextMenuState = () => {
  const closeContextMenu = () => {
    setStore('app', 'contextMenu', {
      open: false,
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      id: '',
      type: null,
      subType: null,
      display: 'none'
    })

    setStore('app', 'subContextMenu', {
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      items: [],
      open: false,
      id: '',
      type: ''
    })
  }

  return { closeContextMenu }
}

export const useContextMenu = () => {
  const setContextMenuItems = items => {
    setStore('app', 'contextMenu', 'items', items)
  }

  const calculatePosition = e => {
    return {
      x:
        e.clientX + 150 >
        (store.app.rightSidebar.isExpanded
          ? window.innerWidth - 300
          : window.innerWidth - 50)
          ? e.clientX - 160
          : e.clientX,
      y: e.clientY + 200 > window.innerHeight ? e.clientY - 200 : e.clientY
    }
  }

  const openContextMenu = (e, id, type, subType) => {
    const { x, y } = calculatePosition(e)

    setStore('app', 'contextMenu', {
      open: true,
      x,
      y,
      id: id,
      type: type,
      subType: subType,
      display: 'block'
    })

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  return { openContextMenu, setContextMenuItems }
}
