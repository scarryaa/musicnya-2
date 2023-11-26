import { For, JSX, createEffect, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import Tooltip from '../Tooltip/Tooltip'
import { historyItemContextMenuConfig } from './Configs/historyItemContextMenuConfig'
import { appContextMenuConfig } from './Configs/appContextMenuConfig'
import { artistContextMenuConfig } from './Configs/artistContextMenuConfig'
import { songContextMenuConfig } from './Configs/songContextMenuConfig'
import { mediaItemContextMenuConfig } from './Configs/mediaItemContextMenuConfig'
import { queueItemContextMenuConfig } from './Configs/queueItemContextMenuConfig'
import { editorialContextMenuConfig } from './Configs/editorialContextMenuConfig'
import { QuickActionItem } from './Components/QuickActionItem'
import { ActionItem } from './Components/ActionItem'
import { SubContextMenu } from './Components/SubContextMenu'

const contextMenuConfig = {
  [ContextMenuType.App]: appContextMenuConfig,
  [ContextMenuType.HistoryItem]: historyItemContextMenuConfig,
  [ContextMenuType.Artist]: artistContextMenuConfig,
  [ContextMenuType.Song]: songContextMenuConfig,
  [ContextMenuType.MediaItem]: mediaItemContextMenuConfig,
  [ContextMenuType.QueueItem]: queueItemContextMenuConfig,
  [ContextMenuType.Editorial]: editorialContextMenuConfig
}

//TODO fix editorial item small context menu
export function ContextMenu(): JSX.Element {
  const { setContextMenuItems } = useContextMenu()
  const { closeContextMenu } = useContextMenuState()

  const updateMenuItems = async (type: ContextMenuType, subType) => {
    if (!contextMenuConfig[type]) {
      console.error('Unsupported context menu type')
      return
    }

    const data = await contextMenuConfig[type].fetchData(
      store.app.contextMenu.id,
      subType
    )
    const updatedItems = contextMenuConfig[type].createMenuItems(
      store.app.contextMenu.id,
      subType,
      data
    )
    setContextMenuItems(updatedItems)
  }

  onMount(() => {
    window.addEventListener('click', closeContextMenu)
    onCleanup(() => window.removeEventListener('click', closeContextMenu))
  })

  createEffect(() => {
    const menuType = store.app.contextMenu.type
    if (!contextMenuConfig[menuType]) {
      return
    }

    const initialMenuItems = contextMenuConfig[menuType].createInitialMenuItems(
      store.app.contextMenu.id,
      store.app.contextMenu.subType
    )
    setContextMenuItems(initialMenuItems)

    if (menuType !== ContextMenuType.Curator && menuType !== ContextMenuType.App) {
      updateMenuItems(menuType, store.app.contextMenu.subType)
    }
  }, [store.app.contextMenu.id, store.app.contextMenu.type])

  const filterMenuItems = isQuickAction =>
    store.app.contextMenu.items.filter(
      item => item && item.isQuickAction === isQuickAction
    )

  return (
    <div
      id="contextMenu"
      class={styles['context-menu']}
      style={`top: ${store.app.contextMenu.y}px; left: ${store.app.contextMenu.x}px; display: ${store.app.contextMenu.display}`}
    >
      <div class={styles['quick-actions']}>
        <For each={filterMenuItems(true)}>{item => <QuickActionItem item={item} />}</For>
      </div>

      <For each={filterMenuItems(false)}>{item => <ActionItem item={item} />}</For>

      <SubContextMenu />
    </div>
  )
}
