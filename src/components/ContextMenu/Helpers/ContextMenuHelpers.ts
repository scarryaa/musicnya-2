import { contextMenuItems } from '../ContextMenuItems'

interface MenuItemConfig {
  label: string
  action: () => void
  // ... other properties
}

export const generateMenuItems = (
  id: string,
  subtype: string,
  itemTypes: string[],
  additionalParams
): MenuItemConfig[] => {
  console.log(itemTypes)
  return itemTypes
    .map(itemType => {
      const itemConfig = contextMenuItems[itemType](id, subtype, ...additionalParams)
      return itemConfig ? { ...itemConfig } : null
    })
    .filter(item => item !== null)
}
