import { A } from '@solidjs/router'
import styles from './RightSidebarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'

type RightSidebarButtonProps = {
  icon: IconDefinition
}

export const RightSidebarButton = ({ icon }: RightSidebarButtonProps) => {
  return (
    <div class={styles.rightSidebarButton}>
      <Fa
        class={styles.rightSidebarButton__icon}
        icon={icon}
        size="lg"
        color="var(--color-white)"
      />
    </div>
  )
}
