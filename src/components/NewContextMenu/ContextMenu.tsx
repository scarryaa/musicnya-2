import { createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import useNewContextMenu from '../../composables/useNewContextMenu'
import { ContextMenuType } from '../../types/types'
import { ContextMenuItems } from './Components/ContextMenuItems/ContextMenuItems'
import { ContextMenuQuickItems } from './Components/ContextMenuQuickItems/ContextMenuQuickItems'
import { contextMenuConfig } from './Configs/mainConfig'
import styles from './ContextMenu.module.scss'
import { updateMenuItems } from './Helpers/ContextMenuHelpers'
import { newContextMenuStore } from '../../stores/newContextMenuStore'
import { SubContextMenu } from './Components/SubContextMenu/SubContextMenu'

export const ContextMenu = () => {
  const [tabbedFromMenuItem, setTabbedFromMenuItem] = createSignal(null as Element | null)
  const { open, menuPosition, closeNewContextMenu, setContextMenuItems } =
    useNewContextMenu()

  const handleKeyDown = (e: KeyboardEvent) => {
    // close the context menu if the user presses escape
    if (e.key === 'Escape') {
      closeNewContextMenu()
    } else if (e.key === 'ArrowDown') {
      // cycle through the menu items, looping back to the top if the user reaches the bottom
      const contextMenu = document.getElementById('context-menu')
      const contextMenuItems = contextMenu?.querySelectorAll('li')
      const activeElement = document.activeElement
      const activeElementIndex = Array.from(contextMenuItems!).indexOf(activeElement)
      const nextElement = contextMenuItems?.[activeElementIndex + 1] as HTMLElement
      nextElement?.focus()
    } else if (e.key === 'ArrowUp') {
      // cycle through the menu items, looping back to the bottom if the user reaches the top
      const contextMenu = document.getElementById('context-menu')
      const contextMenuItems = contextMenu?.querySelectorAll('li')
      const activeElement = document.activeElement
      const activeElementIndex = Array.from(contextMenuItems!).indexOf(activeElement)
      const nextElement = contextMenuItems?.[activeElementIndex - 1] as HTMLElement
      nextElement?.focus()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      // set the tabbed from menu item to the current menu item
      setTabbedFromMenuItem(document.activeElement)

      // open the sub context menu if the user presses the right arrow key
      const subContextMenu = document.getElementById('subContextMenu')
      const subContextMenuItems = subContextMenu?.querySelectorAll('li')
      subContextMenuItems?.[0].focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      console.log(tabbedFromMenuItem)
      // return to the tabbed from menu item if the user presses the left arrow key
      tabbedFromMenuItem()?.focus()
    }
  }

  onMount(() => {
    window.addEventListener('click', closeNewContextMenu)
  })

  onCleanup(() => {
    window.removeEventListener('click', closeNewContextMenu)
  })

  createEffect(() => {
    const menuType = newContextMenuStore.type

    if (
      !newContextMenuStore.open ||
      !newContextMenuStore.type ||
      menuType === ContextMenuType.View
    ) {
      return
    }

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

    // focus the menu when it opens
    setTimeout(() => {
      document.getElementById('context-menu')?.focus()
    })
  }, [newContextMenuStore.id, newContextMenuStore.type])

  console.log('ContextMenuItems', newContextMenuStore.items)
  return (
    <div
      tabindex={-1}
      onKeyDown={(e: KeyboardEvent) => handleKeyDown(e)}
      role="menubar"
      id="context-menu"
      class={styles['context-menu']}
      style={`top: ${menuPosition().y}px; left: ${menuPosition().x}px; display: ${
        open() ? 'block' : 'none'
      }`}
    >
      <ContextMenuQuickItems />
      <ContextMenuItems />
      <SubContextMenu />
    </div>
  )
}
