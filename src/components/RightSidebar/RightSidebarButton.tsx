import styles from './RightSidebarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import Tooltip from '../Tooltip/Tooltip'
Tooltip

type RightSidebarButtonProps = {
  icon: IconDefinition
  tooltip?: string
}

export const RightSidebarButton = ({ icon, tooltip }: RightSidebarButtonProps) => {
  return (
    // @ts-ignore
    <div class={styles['right-sidebar-button']} use:Tooltip="left" title={tooltip}>
      <Fa
        class={styles['right-sidebar-button__icon']}
        icon={icon}
        size="lg"
        color="var(--color-white)"
      />
    </div>
  )
}
