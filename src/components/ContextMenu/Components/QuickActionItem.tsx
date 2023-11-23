import Fa from 'solid-fa'
import styles from './QuickActionItem.module.scss'
import Tooltip from '../../Tooltip/Tooltip'

export const QuickActionItem = ({ item }) => {
  return (
    <div
      class={`${styles.quickActionItem} ${item.disabled ? 'disabled' : ''}`}
      onclick={!item.disabled ? item.action : undefined}
      use:Tooltip={['bottom', item.tooltip, true, 0]}
      aria-disabled={item.disabled}
    >
      <Fa icon={item.icon} size="1x" />
    </div>
  )
}
