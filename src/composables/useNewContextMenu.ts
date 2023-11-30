import { MenuItem } from '../types/newContextMenu'
import {
  newContextMenuStore,
  setNewContextMenuStore
} from '../stores/newContextMenuStore'
import { ContextMenuType } from '../types/types'
import { ContextMenuItem } from '../components/NewContextMenu/Types/Types'

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
    const menuWidth = 165
    const menuHeight = 200
    const { x, y } = calculatePosition(e, menuWidth, menuHeight)
    setNewContextMenuStore('x', x)
    setNewContextMenuStore('y', y)
    setNewContextMenuStore('type', type)
    setNewContextMenuStore('subtype', subType)
    setNewContextMenuStore('id', id)
    setNewContextMenuStore('open', true)
  }

  const closeNewContextMenu = () => {
    setNewContextMenuStore('open', false)
    setNewContextMenuStore('items', [])
    setNewContextMenuStore('id', '')
  }

  const updateNewContextMenuItems = (items: MenuItem[]) => {
    setNewContextMenuStore('items', items)
  }

  return {
    openNewContextMenu,
    closeNewContextMenu,
    updateNewContextMenuItems,
    setContextMenuItems,
    open,
    menuPosition
  }
}

export default useNewContextMenu
