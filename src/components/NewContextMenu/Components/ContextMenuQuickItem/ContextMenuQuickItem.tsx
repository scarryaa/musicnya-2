import styles from './ContextMenuQuickItem.module.scss'
import Fa from 'solid-fa'
import { ContextMenuQuickItemDefinition } from '../../Types/ContextMenuQuickItem'
import Tooltip from '../../../Tooltip/Tooltip'

export const ContextMenuQuickItem = (props: ContextMenuQuickItemDefinition) => {
  return (
    <li
      class={`${styles['context-menu-quick-item']} ${
        props.item.disabled ? 'disabled' : ''
      }`}
      role="menuitem"
      tabIndex={0}
      onClick={() => props.item.action()}
      use:Tooltip={['bottom', props.item.tooltip, true, 0]}
      aria-disabled={props.item.disabled}
    >
      <div class={styles['context-menu-quick-item-button']}>
        <Fa icon={props.item.icon} size="1x" />
      </div>
    </li>
  )
}
