import { For, createSignal, onMount } from 'solid-js'
import { store } from '../../../../stores/store'
import styles from './SubContextMenu.module.scss'
import { useSubContextMenu } from '../../../../composables/useSubContextMenu'
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem'
import { MenuItem } from '../../../../types/newContextMenu'

export const SubContextMenu = () => {
  const { closeSubContextMenu } = useSubContextMenu()
  const [subContextMenuElement, setSubContextMenuElement] = createSignal<HTMLDivElement>()

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      closeSubContextMenu()
    }
  }

  onMount(() => {
    // if subcontext menu is open, close it when pressing escape
    subContextMenuElement().addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeSubContextMenu()
        e.stopPropagation()
      }
    })
  })

  return (
    <div
      ref={setSubContextMenuElement}
      onKeyDown={handleKeyPress}
      tabindex={-1}
      id="subContextMenu"
      class={styles['sub-context-menu']}
      style={`display: ${
        store.app.subContextMenu.open ? 'block' : 'none'
      }; top: calc(0px + ${store.app.subContextMenu.y}px); left: calc(100% + 0px + ${
        store.app.subContextMenu.x
      }px)`}
    >
      <For each={store.app.subContextMenu.items}>
        {(item: MenuItem) => <ContextMenuItem item={item} />}
      </For>
    </div>
  )
}
