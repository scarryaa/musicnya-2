import { For, JSX, createEffect, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import Fa from 'solid-fa'
import Tooltip from '../Tooltip/Tooltip'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import {
  ContextMenuType,
  artistContextMenu,
  curatorContextMenu,
  editorialContextMenu,
  historyItemContextMenu,
  mediaItemContextMenu,
  queueItemContextMenu,
  songContextMenu
} from './ContextMenuTypes'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { mkController } from '../../api/mkController'

const IS_LOVED = 1
const IS_DISLIKED = -1

//TODO fix editorial item small context menu
export function ContextMenu(): JSX.Element {
  const { setContextMenuItems } = useContextMenu()
  const { closeContextMenu } = useContextMenuState()

  const updateMenuItems = async (type: ContextMenuType, subType?: string) => {
    let updatedItems = []

    switch (type) {
      case ContextMenuType.HISTORY_ITEM:
        const [inLibraryState, isLovedState] = await Promise.all([
          mkController.checkIfInLibrary(store.app.contextMenu.id, subType),
          mkController.checkIfLoved(store.app.contextMenu.id, subType)
        ])

        updatedItems = historyItemContextMenu(
          store.app.contextMenu.id,
          subType,
          false,
          isLovedState.data?.[0]?.attributes.value == IS_LOVED,
          isLovedState.data?.[0]?.attributes.value == IS_DISLIKED,
          inLibraryState.data[0].attributes.inLibrary
        )
        break

      case ContextMenuType.ARTIST:
        const isFavoritedState = await mkController.getArtist(store.app.contextMenu.id)

        updatedItems = artistContextMenu(
          store.app.contextMenu.id,
          subType,
          isFavoritedState.data[0].attributes.inFavorites
        )
        break

      case ContextMenuType.SONG:
        const [inLibraryStateSong, isLovedStateSong] = await Promise.all([
          mkController.checkIfInLibrary(store.app.contextMenu.id, subType),
          mkController.checkIfLovedSong(store.app.contextMenu.id, subType)
        ])

        updatedItems = songContextMenu(
          store.app.contextMenu.id,
          false,
          isLovedStateSong.data?.[0]?.attributes.value == IS_LOVED,
          isLovedStateSong.data?.[0]?.attributes.value == IS_DISLIKED,
          inLibraryStateSong.data?.[0]?.attributes?.inLibrary
        )
        break

      case ContextMenuType.MEDIA_ITEM:
        const [inLibraryStateMediaItem, isLovedStateMediaItem] = await Promise.all([
          mkController.checkIfInLibrary(store.app.contextMenu.id, subType),
          mkController.checkIfLoved(store.app.contextMenu.id, subType)
        ])

        updatedItems = mediaItemContextMenu(
          store.app.contextMenu.id,
          false,
          subType,
          isLovedStateMediaItem.data?.[0]?.attributes?.value == IS_LOVED,
          isLovedStateMediaItem.data?.[0]?.attributes?.value == IS_DISLIKED,
          subType.includes('library-')
            ? true
            : inLibraryStateMediaItem.data?.[0]?.attributes?.inLibrary
        )
        break

      case ContextMenuType.QUEUE_ITEM:
        const [inLibraryStateQueueItem, isLovedStateQueueItem] = await Promise.all([
          mkController.checkIfInLibrary(store.app.contextMenu.id, subType),
          mkController.checkIfLoved(store.app.contextMenu.id, subType)
        ])

        updatedItems = queueItemContextMenu(
          store.app.contextMenu.id,
          false,
          subType,
          isLovedStateQueueItem.data?.[0]?.attributes.value == IS_LOVED,
          isLovedStateQueueItem.data?.[0]?.attributes.value == IS_DISLIKED,
          inLibraryStateQueueItem.data[0].attributes.inLibrary
        )
        break

      case ContextMenuType.EDITORIAL:
        const [inLibraryStateEditorial, isLovedStateEditorial] = await Promise.all([
          mkController.checkIfInLibrary(store.app.contextMenu.id, subType),
          mkController.checkIfLoved(store.app.contextMenu.id, subType)
        ])

        updatedItems = editorialContextMenu(
          store.app.contextMenu.id,
          false,
          subType,
          isLovedStateEditorial.data?.[0]?.attributes.value == IS_LOVED,
          isLovedStateEditorial.data?.[0]?.attributes.value == IS_DISLIKED,
          inLibraryStateEditorial.data?.[0]?.attributes?.inLibrary
        )
    }

    setContextMenuItems(updatedItems)
  }

  onMount(() => {
    window.addEventListener('click', closeContextMenu)
    onCleanup(() => window.removeEventListener('click', closeContextMenu))
  })

  createEffect(() => {
    let menuItems = []
    switch (store.app.contextMenu.type) {
      case ContextMenuType.CURATOR:
        menuItems = curatorContextMenu(store.app.contextMenu.id)
        break
      case ContextMenuType.HISTORY_ITEM:
        menuItems = historyItemContextMenu(
          store.app.contextMenu.id,
          store.app.contextMenu.type,
          true
        )
        break
      case ContextMenuType.ARTIST:
        menuItems = artistContextMenu(
          store.app.contextMenu.id,
          store.app.contextMenu.type,
          true
        )
        break
      case ContextMenuType.SONG:
        menuItems = songContextMenu(store.app.contextMenu.id, true, false, false, false)
        break
      case ContextMenuType.MEDIA_ITEM:
        menuItems = mediaItemContextMenu(
          store.app.contextMenu.id,
          true,
          store.app.contextMenu.subType,
          false,
          false,
          store.app.contextMenu.subType.includes('library-')
        )
        break
      case ContextMenuType.QUEUE_ITEM:
        menuItems = queueItemContextMenu(
          store.app.contextMenu.id,
          true,
          store.app.contextMenu.subType,
          false,
          false
        )
        break

      case ContextMenuType.EDITORIAL:
        menuItems = editorialContextMenu(
          store.app.contextMenu.id,
          true,
          store.app.contextMenu.subType,
          false,
          false,
          false
        )
        break

      default:
        return
    }

    setContextMenuItems(menuItems)
    if (store.app.contextMenu.type !== ContextMenuType.CURATOR) {
      updateMenuItems(store.app.contextMenu.type, store.app.contextMenu.subType)
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
        <For each={filterMenuItems(true)}>
          {item => (
            <div
              class={`${styles.contextMenu__quick__item} ${
                item.disabled ? 'disabled' : ''
              }`}
              onclick={!item.disabled ? item.action : undefined}
              use:Tooltip={['bottom', item.tooltip, true, 0]}
              aria-disabled={item.disabled}
            >
              <Fa icon={item.icon} size="1x" />
            </div>
          )}
        </For>
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
