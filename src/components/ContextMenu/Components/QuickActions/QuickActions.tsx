import { store } from '../../../../stores/store'
import { filterMenuItems } from '../../Helpers/ContextMenuHelpers'
import { QuickActionItem } from '../QuickActionItem/QuickActionItem'
import styles from './QuickActions.module.scss'

export const QuickActions = ({ items }) => (
  <div class={styles['quick-actions']}>
    <For each={filterMenuItems(store.app.contextMenu.items, true)}>
      {item => <QuickActionItem item={item} />}
    </For>
  </div>
)
