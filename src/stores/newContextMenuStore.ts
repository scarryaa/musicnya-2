import { createStore } from 'solid-js/store'
import { ContextMenuType } from '../types/types'
import { ContextMenuItemDefinition } from '../components/NewContextMenu/Types/ContextMenuItem'

export const [newContextMenuStore, setNewContextMenuStore] = createStore({
  open: false,
  type: ContextMenuType.App as ContextMenuType,
  subtype: '',
  x: 0,
  y: 0,
  items: [] as ContextMenuItemDefinition[],
  id: '',
  display: 'block',
  menuOpenCount: 0
})
