import { A } from '@solidjs/router'
import styles from './BaseLink.module.scss'

type BaseLinkProps = {
  href: string
  children: any
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
      class={`${styles.baseLink} ${additionalClass ?? ''}`}
      activeClass={activeClass}
      aria-label={ariaLabel}
      href={href}
    >
      {children}
    </A>
  )
}
