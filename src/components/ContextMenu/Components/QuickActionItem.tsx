import Fa from 'solid-fa'
import styles from './QuickActionItem.module.scss'
import Tooltip from '../../Tooltip/Tooltip'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

Tooltip
type QuickActionItemProps = {
  item: {
    icon: IconDefinition
    action: () => void
    disabled?: boolean
    tooltip: string
  }
}

export const QuickActionItem = ({ item }: QuickActionItemProps) => {
  return (
    <div
      class={`${styles['quick-action-item']} ${item.disabled ? 'disabled' : ''}`}
      onclick={!item.disabled ? item.action : undefined}
      use:Tooltip={['bottom', item.tooltip, true, 0]}
      aria-disabled={item.disabled}
    >
      <Fa icon={item.icon} size="1x" />
    </div>
  )
}
