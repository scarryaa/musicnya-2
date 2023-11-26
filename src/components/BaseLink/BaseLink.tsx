import { A } from '@solidjs/router'
import styles from './BaseLink.module.scss'
import { JSX } from 'solid-js'

type BaseLinkProps = {
  href: string
  children: JSX.Element | JSX.Element[]
  'aria-label': string
  activeClass?: string
  class?: string
}

export const BaseLink = ({
  href,
  children,
  'aria-label': ariaLabel,
  activeClass,
  class: additionalClass
}: BaseLinkProps) => {
  return (
    <A
      class={`${styles['base-link']} ${additionalClass ?? ''}`}
      activeClass={activeClass}
      aria-label={ariaLabel}
      href={href}
    >
      {children}
    </A>
  )
}
