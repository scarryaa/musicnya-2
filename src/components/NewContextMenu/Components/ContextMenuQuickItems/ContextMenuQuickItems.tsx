import { For } from 'solid-js'
import styles from './ContextMenuQuickItems.module.scss'
import { newContextMenuStore } from '../../../../stores/newContextMenuStore'
import { filterMenuItems } from '../../Helpers/ContextMenuHelpers'
import { ContextMenuQuickItem } from '../ContextMenuQuickItem/ContextMenuQuickItem'

export const ContextMenuQuickItems = () => {
  return (
    <ul class={styles['context-menu-quick-items']}>
      <For each={filterMenuItems(newContextMenuStore.items, true)}>
        {item => <ContextMenuQuickItem item={item} />}
      </For>
    </ul>
  )
}
