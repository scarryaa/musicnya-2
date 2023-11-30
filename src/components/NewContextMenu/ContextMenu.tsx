import { createEffect, onCleanup, onMount } from 'solid-js'
import useNewContextMenu from '../../composables/useNewContextMenu'
import { ContextMenuType } from '../../types/types'
import { ContextMenuItems } from './Components/ContextMenuItems/ContextMenuItems'
import { ContextMenuQuickItems } from './Components/ContextMenuQuickItems/ContextMenuQuickItems'
import { contextMenuConfig } from './Configs/mainConfig'
import styles from './ContextMenu.module.scss'
import { updateMenuItems } from './Helpers/ContextMenuHelpers'
import { newContextMenuStore } from '../../stores/newContextMenuStore'

export const ContextMenu = () => {
  const { open, menuPosition, closeNewContextMenu, setContextMenuItems } =
    useNewContextMenu()

  onMount(() => {
    window.addEventListener('click', closeNewContextMenu)
  })

  onCleanup(() => {
    window.removeEventListener('click', closeNewContextMenu)
  })

  createEffect(() => {
    if (!newContextMenuStore.id || !newContextMenuStore.type) {
      return
    }

    const menuType = newContextMenuStore.type

    const initialMenuItems = contextMenuConfig[menuType].createInitialMenuItems(
      newContextMenuStore.id,
      newContextMenuStore.subtype
    )
    setContextMenuItems(initialMenuItems)

    if (menuType !== ContextMenuType.Curator && menuType !== ContextMenuType.App) {
      updateMenuItems(
        menuType,
        newContextMenuStore.subtype as MusicKit.MediaItemType,
        contextMenuConfig,
        setContextMenuItems
      ).catch(err => console.error(err))
    }
  })

  return (
    <ul
      role="menubar"
      class={styles['context-menu']}
      style={`top: ${menuPosition().y}px; left: ${menuPosition().x}px; display: ${
        open() ? 'block' : 'none'
      }`}
    >
      <li role="menuitem">
        <ContextMenuQuickItems />
        <ContextMenuItems />
      </li>
    </ul>
  )
}
