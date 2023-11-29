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

export const filterMenuItems = (items, isQuickAction) =>
  items.filter(item => item && item.isQuickAction === isQuickAction)

export const updateMenuItems = async (type, subType, config, setItems, store) => {
  if (!config[type]) {
    console.error('Unsupported context menu type')
    return
  }

  const data = await config[type].fetchData(store.app.contextMenu.id, subType)
  const updatedItems = config[type].createMenuItems(
    store.app.contextMenu.id,
    subType,
    data
  )
  setItems(updatedItems)
}
