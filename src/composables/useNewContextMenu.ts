import { MenuItem } from '../types/newContextMenu'
import {
  newContextMenuStore,
  setNewContextMenuStore
} from '../stores/newContextMenuStore'
import { ContextMenuType } from '../types/types'
import { ContextMenuItem } from '../components/NewContextMenu/Types/Types'
import { setStore } from '../stores/store'

const OUT_OF_VIEW = -1000

const useNewContextMenu = () => {
  const open = () => newContextMenuStore.open
  const menuPosition = () => ({
    x: newContextMenuStore.x,
    y: newContextMenuStore.y
  })

  const setContextMenuItems = (items: ContextMenuItem[]) => {
    setNewContextMenuStore('items', items)
  }

  const calculatePosition = (e: MouseEvent, menuWidth: number, menuHeight: number) => {
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

  const openNewContextMenu = (
    e: MouseEvent,
    id: string,
    type: ContextMenuType,
    subType: MusicKit.MediaItemType
  ) => {
    e.preventDefault()
    e.stopPropagation()
    const menuWidth = 165
    const menuHeight = 200
    const { x, y } = calculatePosition(e, menuWidth, menuHeight)
    setNewContextMenuStore('x', x)
    setNewContextMenuStore('y', y)
    setNewContextMenuStore('type', type)
    setNewContextMenuStore('subtype', subType)
    setNewContextMenuStore('id', id)
    setNewContextMenuStore('open', true)

    setStore('app', 'subContextMenu', {
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      items: [],
      open: false,
      id: '',
      type: ''
    })
  }

  const closeNewContextMenu = () => {
    setNewContextMenuStore('open', false)
    setNewContextMenuStore('items', [])
    setNewContextMenuStore('id', '')

    setStore('app', 'subContextMenu', {
      x: OUT_OF_VIEW,
      y: OUT_OF_VIEW,
      items: [],
      open: false,
      id: '',
      type: ''
    })
  }

  const updateNewContextMenuItems = (items: MenuItem[]) => {
    setNewContextMenuStore('items', items)
  }

  const handleSpaceOrEnter = (event: KeyboardEvent, action: () => void) => {
    const isSpacePressed = event.key === ' ' || event.keyCode === 32
    const isEnterPressed = event.key === 'Enter' || event.keyCode === 13

    if (isSpacePressed || isEnterPressed) {
      event.preventDefault()
      action()
      closeNewContextMenu()
    }
  }

  return {
    openNewContextMenu,
    closeNewContextMenu,
    updateNewContextMenuItems,
    setContextMenuItems,
    open,
    menuPosition,
    handleSpaceOrEnter
  }
}

export default useNewContextMenu
