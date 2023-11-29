import { contextMenuItems } from '../ContextMenuItems'
import { MenuItem } from '../Types/MenuItem'

interface MenuItemConfig {
  label: string
  action: () => void
  // ... other properties
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
        ...(additionalParams as any)
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
  setItems,
  store
) => {
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
