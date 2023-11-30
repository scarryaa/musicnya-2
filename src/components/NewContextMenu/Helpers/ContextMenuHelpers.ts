import { contextMenuItems } from '../ContextMenuItems'
import { MenuItem } from '../../ContextMenu/Types/MenuItem'
import { newContextMenuStore } from '../../../stores/newContextMenuStore'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

export interface MenuItemConfig {
  label: string
  action: () => void
  disabled?: boolean
  icon?: IconDefinition
  isQuickAction?: boolean
  hasSubMenu?: boolean
  onMouseEnter?: (e: FocusEvent, id: string) => void
  onMouseLeave?: () => void
  onClick?: (e: MouseEvent, id: string) => void
  id?: string
}

export const generateMenuItems = (
  id: string,
  subtype: string,
  itemTypes: string[],
  additionalParams?: Array<{ [key: string]: boolean }>
): MenuItemConfig[] => {
  console.log(itemTypes)
  return itemTypes
    .map(itemType => {
      const itemConfig = contextMenuItems[itemType](
        id,
        subtype as MusicKit.MediaItemType,
        ...additionalParams
      )
      return itemConfig ? { ...itemConfig } : null
    })
    .filter(item => item !== null)
}

export const filterMenuItems = (items: MenuItem[], isQuickAction): MenuItem[] =>
  items.filter(item => item && item.isQuickAction === isQuickAction)

export const updateMenuItems = async (
  type: string,
  subType: MusicKit.MediaItemType,
  config,
  setItems
) => {
  if (!config[type]) {
    console.error('Unsupported context menu type')
    return
  }

  const data = await config[type].fetchData(newContextMenuStore.id, subType)
  const updatedItems = config[type].createMenuItems(newContextMenuStore.id, subType, data)
  setItems(updatedItems)
}

export const onSpaceOrEnter = (event: KeyboardEvent, action: () => void) => {
  const isSpacePressed = event.key === ' ' || event.keyCode === 32
  const isEnterPressed = event.key === 'Enter' || event.keyCode === 13

  if (isSpacePressed || isEnterPressed) {
    event.preventDefault()
    action()
  }
}
