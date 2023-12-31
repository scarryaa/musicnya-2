import { A } from '@solidjs/router'
import styles from './LeftSidebarButton.module.scss'
import Fa from 'solid-fa'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { store } from '../../stores/store'
import Tooltip from '../Tooltip/Tooltip'
import { createMemo } from 'solid-js'
Tooltip

type LeftSidebarButtonProps = {
  icon: IconDefinition
  text?: string
  href?: string
  tooltip?: string
  showTooltip?: boolean
  isLink?: boolean
}

export const LeftSidebarButton = ({
  icon,
  text,
  href,
  tooltip,
  showTooltip,
  isLink = true
}: LeftSidebarButtonProps) => {
  const computedShowTooltip = createMemo(() => {
    return store.app.leftSidebarWidth < 61
  })

  const buttonLink = (
    <A
      class={styles['left-sidebar-button']}
      href={href}
      activeClass="active"
      style={{
        'justify-content': store.app.leftSidebarWidth > 119 ? 'flex-start' : 'center'
      }}
    >
      <Fa
        class={styles['left-sidebar-button__icon']}
        icon={icon}
        size="lg"
        color="var(--color-sidebar-button)"
      />
      {store.app.leftSidebarWidth > 119 && (
        <span class={styles['left-sidebar-button__text']}>{text}</span>
      )}
    </A>
  )

  const buttonNonLink = (
    <div
      class={styles['left-sidebar-button']}
      style={{
        'justify-content': store.app.leftSidebarWidth > 119 ? 'flex-start' : 'center'
      }}
    >
      <Fa
        class={styles['left-sidebar-button__icon']}
        icon={icon}
        size="lg"
        color="var(--color-sidebar-button)"
      />
      {store.app.leftSidebarWidth > 119 && (
        <span class={styles['left-sidebar-button__text']}>{text}</span>
      )}
    </div>
  )

  return (
    // @ts-ignore
    <div use:Tooltip={['right', tooltip, showTooltip || computedShowTooltip]}>
      {isLink ? buttonLink : buttonNonLink}
    </div>
  )
}
