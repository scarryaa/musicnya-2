import { setStore } from '../stores/store'

const OUT_OF_VIEW = -10000

export const useSubContextMenuState = () => {
  const closeSubContextMenu = () => {
    setStore('app', 'subContextMenu', {
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      items: [],
      open: false,
      id: '',
      type: ''
    })
  }

  return { closeSubContextMenu }
}

export const useSubContextMenu = () => {
  const setSubContextMenuItems = items => {
    setStore('app', 'subContextMenu', 'items', items)
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

  const openSubContextMenu = (e, items) => {
    // Initially set the menu to not visible but mark as open
    setStore('app', 'subContextMenu', {
      open: true,
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      items: items
    })

    // Schedule the position calculation to after the component has been updated
    requestAnimationFrame(() => {
      const menuElement = document.getElementById('subContextMenu')
      if (menuElement) {
        // TODO refactor this
        const { width, height } = menuElement.getBoundingClientRect()
        const x = e.clientX - width / 2 > window.innerWidth / 2 ? -325 : 0
        const y = e.clientY - height > window.innerHeight / 2 ? -130 : 35
        setStore('app', 'subContextMenu', { x, y })
      }
    })
  }

  return { setSubContextMenuItems, openSubContextMenu }
}
