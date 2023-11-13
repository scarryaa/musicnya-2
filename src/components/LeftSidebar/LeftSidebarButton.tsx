import { A } from '@solidjs/router'
import styles from './LeftSidebarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { store } from '../../stores/store'
import Tooltip from '../Tooltip/Tooltip'
import { Accessor, createMemo } from 'solid-js'

type LeftSidebarButtonProps = {
  icon: IconDefinition
  href: string
  text: string
  tooltip?: string
  showTooltip?: Accessor<boolean>
}

export const LeftSidebarButton = ({
  icon,
  href,
  text,
  tooltip,
  showTooltip
}: LeftSidebarButtonProps) => {
  const computedShowTooltip = createMemo(() => {
    return store.app.leftSidebarWidth < 61
  })

  return (
    // @ts-ignore
    <div use:Tooltip={['right', tooltip, computedShowTooltip]}>
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
    </div>
  )
}
