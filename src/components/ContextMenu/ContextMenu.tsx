import { For, JSX, createEffect, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import Fa from 'solid-fa'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { ContextMenuType, Reaction } from '../../types/types'
import Tooltip from '../Tooltip/Tooltip'
import { historyItemContextMenuConfig } from './Configs/historyItemContextMenuConfig'
import { appContextMenuConfig } from './Configs/appContextMenuConfig'
import { artistContextMenuConfig } from './Configs/artistContextMenuConfig'
import { songContextMenuConfig } from './Configs/songContextMenuConfig'
import { mediaItemContextMenuConfig } from './Configs/mediaItemContextMenuConfig'
import { queueItemContextMenuConfig } from './Configs/queueItemContextMenuConfig'
import { editorialContextMenuConfig } from './Configs/editorialContextMenuConfig'
import { QuickActionItem } from './Components/QuickActionItem'

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

  const updateMenuItems = async (type, subType) => {
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
      class={styles.contextMenu}
      style={`top: ${store.app.contextMenu.y}px; left: ${store.app.contextMenu.x}px; display: ${store.app.contextMenu.display}`}
    >
      <div class={styles.quickActions}>
        <For each={filterMenuItems(true)}>{item => <QuickActionItem item={item} />}</For>
      </div>

      <For each={filterMenuItems(false)}>
        {item => (
          <div
            class={styles.contextMenu__item}
            onclick={item.action}
            onMouseOver={item.onMouseOver}
            onMouseLeave={item.onMouseLeave}
          >
            <Fa icon={item.icon} class={styles.icon} />
            <span class={styles.label}>{item.label}</span>
            {item.hasSubMenu && <Fa icon={faChevronRight} class={styles.subMenuIcon} />}
          </div>
        )}
      </For>

      <div
        class={styles.contextMenu__subContextMenu}
        style={`display: ${
          store.app.subContextMenu.open ? 'block' : 'none'
        }; top: calc(0px + ${
          store.app.subContextMenu.y
        }px); left: 100%; position: absolute; width: 100%; max-height: 200%; overflow-y: auto;`}
      >
        <For each={store.app.subContextMenu.items}>
          {item => (
            <div
              class={styles.contextMenu__item}
              onclick={item.hasSubMenu ? null : item.action}
              onMouseOver={item.onMouseOver}
              onMouseLeave={item.onMouseLeave}
            >
              <span class={styles.contextMenu__item__icon}>
                <Fa icon={item.icon} size="1x" color="white" />
              </span>
              <span
                style={`vertical-align: top; margin-left: 0.5rem; margin-top: 6px; text-overflow: ellipsis; overflow: hidden;`}
              >
                {item.label}
              </span>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
