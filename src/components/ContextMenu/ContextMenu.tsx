import { JSX, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import styles from './ContextMenu.module.scss'
import { store } from '../../stores/store'
import { useContextMenu } from '../../composables/useContextMenu'
import { ContextMenuType } from '../../types/types'
import { SubContextMenu } from './Components/SubContextMenu/SubContextMenu'
import { updateMenuItems } from '../NewContextMenu/Helpers/ContextMenuHelpers'
import { QuickActions } from './Components/QuickActions/QuickActions'
import { StandardActions } from './Components/StandardActions/StandardActions'
import { MenuItem } from './Types/MenuItem'
import { contextMenuConfig } from '../NewContextMenu/Configs/mainConfig'

//TODO fix editorial item small context menu
export function ContextMenu(): JSX.Element {
  const [contextMenuElement, setContextMenuElement] = createSignal<HTMLDivElement>()
  const { setContextMenuItems, trapFocus, closeContextMenu, handleKeyPress } =
    useContextMenu()

  onMount(() => {
    window.addEventListener('click', closeContextMenu)
    contextMenuElement().addEventListener('keydown', trapFocus)
    contextMenuElement().addEventListener('keydown', handleKeyPress)
  })
  onCleanup(() => {
    window.removeEventListener('click', closeContextMenu)
    contextMenuElement().removeEventListener('keydown', trapFocus)
    contextMenuElement().removeEventListener('keydown', handleKeyPress)
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
    document.getElementById('contextMenu')?.focus()

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
      ref={setContextMenuElement}
      id="contextMenu"
      tabIndex={-1}
      class={styles['context-menu']}
      style={`top: ${store.app.contextMenu.y}px; left: ${store.app.contextMenu.x}px; display: ${store.app.contextMenu.display}`}
    >
      <QuickActions />
      <StandardActions />

      <SubContextMenu />
    </div>
  )
}
