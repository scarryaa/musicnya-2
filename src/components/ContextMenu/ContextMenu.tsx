import { For, JSX, createEffect, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import Fa from 'solid-fa'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import {
  artistContextMenu,
  editorialContextMenu,
  historyItemContextMenu,
  mediaItemContextMenu,
  queueItemContextMenu,
  songContextMenu
} from './ContextMenuTypes'
import { useContextMenu, useContextMenuState } from '../../composables/useContextMenu'
import { mkController } from '../../api/mkController'
import { ContextMenuType, Reaction } from '../../types/types'

const contextMenuConfig = {
  [ContextMenuType.HistoryItem]: {
    fetchData: async (id, subType) => {
      const [inLibraryState, isLovedState] = await Promise.all([
        mkController.checkIfInLibrary(id, subType),
        mkController.checkIfLoved(id, subType)
      ])

      return {
        inLibrary: inLibraryState.data[0].attributes.inLibrary,
        isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
        isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
      }
    },
    createInitialMenuItems: (id, subType) =>
      historyItemContextMenu(id, subType, true, false, false, false),
    createMenuItems: (id, subType, data) =>
      historyItemContextMenu(
        id,
        subType,
        false,
        data.isLoved,
        data.isDisliked,
        data.inLibrary
      )
  },
  [ContextMenuType.Artist]: {
    fetchData: async id => {
      const isFavoritedState = await mkController.getArtist(id)

      return {
        isFavorited: isFavoritedState.data[0].attributes.inFavorites
      }
    },
    createInitialMenuItems: (id, subType) => artistContextMenu(id, subType, false),
    createMenuItems: (id, subType, data) =>
      artistContextMenu(id, subType, data.isFavorited)
  },
  [ContextMenuType.Song]: {
    fetchData: async (id, subType) => {
      const [inLibraryState, isLovedState] = await Promise.all([
        mkController.checkIfInLibrary(id, subType),
        mkController.checkIfLovedSong(id, subType)
      ])

      return {
        inLibrary: inLibraryState.data?.[0]?.attributes?.inLibrary,
        isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
        isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
      }
    },
    createInitialMenuItems: (id, subType) =>
      songContextMenu(id, true, false, false, false),
    createMenuItems: (id, subType, data) =>
      songContextMenu(id, false, data.isLoved, data.isDisliked, data.inLibrary)
  },
  [ContextMenuType.MediaItem]: {
    fetchData: async (id, subType) => {
      const [inLibraryState, isLovedState] = await Promise.all([
        mkController.checkIfInLibrary(id, subType),
        mkController.checkIfLoved(id, subType)
      ])

      return {
        inLibrary: inLibraryState.data?.[0]?.attributes?.inLibrary,
        isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
        isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
      }
    },
    createInitialMenuItems: (id, subType) =>
      mediaItemContextMenu(id, true, subType, false, false, false),
    createMenuItems: (id, subType, data) =>
      mediaItemContextMenu(
        id,
        false,
        subType,
        data.isLoved,
        data.isDisliked,
        data.inLibrary
      )
  },
  [ContextMenuType.QueueItem]: {
    fetchData: async (id, subType) => {
      const [inLibraryState, isLovedState] = await Promise.all([
        mkController.checkIfInLibrary(id, subType),
        mkController.checkIfLoved(id, subType)
      ])

      return {
        inLibrary: inLibraryState.data[0].attributes.inLibrary,
        isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
        isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
      }
    },
    createInitialMenuItems: (id, subType) =>
      queueItemContextMenu(id, true, subType, false, false, false),
    createMenuItems: (id, subType, data) =>
      queueItemContextMenu(
        id,
        false,
        subType,
        data.isLoved,
        data.isDisliked,
        data.inLibrary
      )
  },
  [ContextMenuType.Editorial]: {
    fetchData: async (id, subType) => {
      const [inLibraryState, isLovedState] = await Promise.all([
        mkController.checkIfInLibrary(id, subType),
        mkController.checkIfLoved(id, subType)
      ])

      return {
        inLibrary: inLibraryState.data?.[0]?.attributes?.inLibrary,
        isLoved: isLovedState.data?.[0]?.attributes.value == Reaction.Loved,
        isDisliked: isLovedState.data?.[0]?.attributes.value == Reaction.Disliked
      }
    },
    createInitialMenuItems: (id, subType) =>
      editorialContextMenu(id, true, subType, false, false, false),
    createMenuItems: (id, subType, data) =>
      editorialContextMenu(
        id,
        false,
        subType,
        data.isLoved,
        data.isDisliked,
        data.inLibrary
      )
  }
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

    if (menuType !== ContextMenuType.Curator) {
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
