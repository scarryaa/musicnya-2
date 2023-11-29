import { JSX, createEffect, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { historyItemContextMenuConfig } from './Configs/historyItemContextMenuConfig'
import { appContextMenuConfig } from './Configs/appContextMenuConfig'
import { artistContextMenuConfig } from './Configs/artistContextMenuConfig'
import { songContextMenuConfig } from './Configs/songContextMenuConfig'
import { mediaItemContextMenuConfig } from './Configs/mediaItemContextMenuConfig'
import { queueItemContextMenuConfig } from './Configs/queueItemContextMenuConfig'
import { editorialContextMenuConfig } from './Configs/editorialContextMenuConfig'
import { SubContextMenu } from './Components/SubContextMenu/SubContextMenu'
import { curatorContextMenuConfig } from './Configs/curatorContextMenuConfig'
import { updateMenuItems } from './Helpers/ContextMenuHelpers'
import { QuickActions } from './Components/QuickActions/QuickActions'
import { StandardActions } from './Components/StandardActions/StandardActions'
import { MenuItem } from './Types/MenuItem'

const contextMenuConfig: Record<ContextMenuType, any> = {
  [ContextMenuType.App]: appContextMenuConfig,
  [ContextMenuType.HistoryItem]: historyItemContextMenuConfig,
  [ContextMenuType.Artist]: artistContextMenuConfig,
  [ContextMenuType.Song]: songContextMenuConfig,
  [ContextMenuType.MediaItem]: mediaItemContextMenuConfig,
  [ContextMenuType.QueueItem]: queueItemContextMenuConfig,
  [ContextMenuType.Editorial]: editorialContextMenuConfig,
  [ContextMenuType.Curator]: curatorContextMenuConfig
}

//TODO fix editorial item small context menu
export function ContextMenu(): JSX.Element {
  const { setContextMenuItems } = useContextMenu()
  const { closeContextMenu } = useContextMenuState()

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
    ) as MenuItem[]
    setContextMenuItems(initialMenuItems)

    if (menuType !== ContextMenuType.Curator && menuType !== ContextMenuType.App) {
      updateMenuItems(
        menuType,
        store.app.contextMenu.subType as MusicKit.MediaItemType,
        contextMenuConfig,
        setContextMenuItems,
        store
      ).catch(err => console.error(err))
    }
  }, [store.app.contextMenu.id, store.app.contextMenu.type])

  return (
    <div
      id="contextMenu"
      class={styles['context-menu']}
      style={`top: ${store.app.contextMenu.y}px; left: ${store.app.contextMenu.x}px; display: ${store.app.contextMenu.display}`}
    >
      <QuickActions />
      <StandardActions />

      <SubContextMenu />
    </div>
  )
}
