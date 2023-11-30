import { setStore, store } from '../stores/store'

const OUT_OF_VIEW = -10000

const contextMenuActions = {
  setContextMenuItems: items => {
    console.log(items)
    setStore('app', 'contextMenu', 'items', items)
  },
  calculatePosition: (e, menuWidth, menuHeight) => {
    const padding = 10
    const { clientX, clientY } = e

    let x =
      clientX + menuWidth + padding > window.innerWidth ? clientX - menuWidth : clientX

    let y =
      clientY + menuHeight + padding > window.innerHeight ? clientY - menuHeight : clientY

    x = Math.max(padding, Math.min(x, window.innerWidth - menuWidth - padding))
    y = Math.max(padding, Math.min(y, window.innerHeight - menuHeight - padding))

    return { x, y }
  },
  openContextMenu: (e, id, type, subType) => {
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
      const { x, y } = contextMenuActions.calculatePosition(e, offsetWidth, offsetHeight)

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
  },
  trapFocus: (event: KeyboardEvent) => {
    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const modal = document.getElementById('contextMenu') // The context menu element
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]
    const focusableContent = modal.querySelectorAll(focusableElements)
    const lastFocusableElement = focusableContent[focusableContent.length - 1]

    const isTabPressed = event.key === 'Tab' || event.keyCode === 9

    if (!isTabPressed) {
      return
    }

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus()
        event.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        event.preventDefault()
      }
    }
  },
  handleKeyPress: (e: KeyboardEvent) => {
    // if key is escape, close context menu if sub context menu is not open
    if (e.key === 'Escape' && !store.app.subContextMenu.open) {
      contextMenuActions.closeContextMenu()
      // if key is enter or space, close context menu
    } else if (e.key === 'Enter' || e.key === ' ') {
      contextMenuActions.closeContextMenu()
      // if key is left or right, focus on first item in sub context menu
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      document.getElementById('subContextMenu')?.focus()
      // if key is up or down, move between items in context menu
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const contextMenuItems = document.querySelectorAll('.context-menu-item')
      const contextMenuItemsArray = Array.from(contextMenuItems)
      const focusedItem = document.activeElement as HTMLElement
      const focusedItemIndex = contextMenuItemsArray.indexOf(focusedItem)
      const nextItemIndex =
        focusedItemIndex + (e.key === 'ArrowUp' ? -1 : 1) >= contextMenuItemsArray.length
          ? 0
          : focusedItemIndex + (e.key === 'ArrowUp' ? -1 : 1)
      const nextItem = contextMenuItemsArray[nextItemIndex]
      nextItem.focus()
    }
  },

  closeContextMenu: () => {
    setStore('app', 'contextMenu', {
      open: false,
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      id: '',
      type: null,
      subType: null,
      display: 'none'
    })
  }
}

export const useContextMenu = () => contextMenuActions
