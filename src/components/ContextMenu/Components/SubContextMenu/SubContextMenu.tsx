import { For, createSignal, onMount } from 'solid-js'
import { store } from '../../../../stores/store'
import styles from './SubContextMenu.module.scss'
import { ActionItem } from '../ActionItem/ActionItem'
import { MenuItem } from '../../Types/MenuItem'
import { useSubContextMenu } from '../../../../composables/useSubContextMenu'

export const SubContextMenu = () => {
  const { closeSubContextMenu } = useSubContextMenu()
  const [subContextMenuElement, setSubContextMenuElement] = createSignal<HTMLDivElement>()

  onMount(() => {
    // if subcontext menu is open, close it when pressing escape
    subContextMenuElement().addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeSubContextMenu()
      }
    })
  })

  return (
    <div
      ref={setSubContextMenuElement}
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
        {(item: MenuItem) => <ActionItem item={item} />}
      </For>
    </div>
  )
}
