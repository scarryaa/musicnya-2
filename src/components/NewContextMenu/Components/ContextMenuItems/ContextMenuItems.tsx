import { For } from 'solid-js'
import { ContextMenuItem } from '../ContextMenuItem/ContextMenuItem'
import styles from './ContextMenuItems.module.scss'
import { filterMenuItems } from '../../Helpers/ContextMenuHelpers'
import { newContextMenuStore } from '../../../../stores/newContextMenuStore'

export const ContextMenuItems = () => {
  return (
    <ul class={styles['context-menu-items']} role="menubar">
      <For each={filterMenuItems(newContextMenuStore.items, false)}>
        {item => <ContextMenuItem item={item} />}
      </For>
    </ul>
  )
}
