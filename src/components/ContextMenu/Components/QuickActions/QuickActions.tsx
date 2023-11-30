import { For } from 'solid-js'
import { store } from '../../../../stores/store'
import { filterMenuItems } from '../../../NewContextMenu/Helpers/ContextMenuHelpers'
import { QuickActionItem } from '../QuickActionItem/QuickActionItem'
import styles from './QuickActions.module.scss'
import { MenuItem } from '../../Types/MenuItem'

export const QuickActions = () => {
  return (
    <div class={styles['quick-actions']}>
      <For each={filterMenuItems(store.app.contextMenu.items as MenuItem[], true)}>
        {item => <QuickActionItem item={item} />}
      </For>
    </div>
  )
}
