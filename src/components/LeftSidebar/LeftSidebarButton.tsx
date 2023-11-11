import { A } from '@solidjs/router'
import styles from './LeftSidebarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { store } from '../../stores/store'

type LeftSidebarButtonProps = {
  icon: IconDefinition
  href: string
  text: string
}

export const LeftSidebarButton = ({ icon, href, text }: LeftSidebarButtonProps) => {
  return (
    <A
      class={styles.leftSidebarButton}
      href={href}
      activeClass="active"
      style={{
        'justify-content': store.app.leftSidebarWidth > 119 ? 'flex-start' : 'center'
      }}
    >
      <Fa
        class={styles.leftSidebarButton__icon}
        icon={icon}
        size="lg"
        color="var(--color-sidebar-button)"
      />
      {store.app.leftSidebarWidth > 119 && (
        <span class={styles.leftSidebarButton__text}>{text}</span>
      )}
    </A>
  )
}
