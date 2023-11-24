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

  const calculatePosition = (e, menuWidth, menuHeight) => {
    const padding = 10
    const { clientX, clientY } = e

    let x =
      clientX + menuWidth + padding > window.innerWidth ? clientX - menuWidth : clientX

    let y =
      clientY + menuHeight + padding > window.innerHeight ? clientY - menuHeight : clientY

    x = Math.max(padding, Math.min(x, window.innerWidth - menuWidth - padding))
    y = Math.max(padding, Math.min(y, window.innerHeight - menuHeight - padding))

    return { x, y }
  }

  const openContextMenu = (e, id, type, subType) => {
    setStore('app', 'contextMenu', {
      open: true,
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      id: '',
      type: null,
      subType: null,
      display: 'block'
    })

    const menu = document.getElementById('contextMenu')
    if (menu) {
      const { offsetWidth, offsetHeight } = menu
      const { x, y } = calculatePosition(e, offsetWidth, offsetHeight)

      setStore('app', 'contextMenu', {
        open: true,
        x,
        y,
        id: id,
        type: type,
        subType: subType,
        display: 'block'
      })

      setStore('app', 'subContextMenu', {
        x,
        y,
        items: [],
        open: false,
        id: '',
        type: ''
      })

      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
  }

  return { openContextMenu, setContextMenuItems }
}
