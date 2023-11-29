import { setStore } from '../../../stores/store'
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

export const trapFocus = (event: KeyboardEvent) => {
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
}

export const closeContextMenu = () => {
  setStore('app', 'contextMenu', { open: false, id: null, type: null })
}

export const onSpaceOrEnter = (event: KeyboardEvent, action: () => void) => {
  const isSpacePressed = event.key === ' ' || event.keyCode === 32
  const isEnterPressed = event.key === 'Enter' || event.keyCode === 13

  if (isSpacePressed || isEnterPressed) {
    event.preventDefault()
    action()
  }
}
