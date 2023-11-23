import styles from './TopbarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import Tooltip from '../Tooltip/Tooltip'

type TopbarButtonProps = {
  icon: IconDefinition
  tooltip?: string
  showTooltip?: boolean
  onClick?: (e: MouseEvent) => void
}

export const TopbarButton = ({
  icon,
  tooltip,
  showTooltip,
  onClick
}: TopbarButtonProps) => {
  return (
    <div class={styles.topbarButton} onClick={onClick}>
      <Fa
        class={styles.topbarButton__icon}
        icon={icon}
        size="1x"
        color="var(--color-on-primary)"
      />
    </div>
  )
}
