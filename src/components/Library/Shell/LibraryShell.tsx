import { JSX } from 'solid-js'
import styles from './LibraryShell.module.scss'

type LibraryShellProps = {
  title: string
  actions: any
  children: JSX.Element | JSX.Element[]
}

export const LibraryShell = ({ children, title, actions }: LibraryShellProps) => {
  return (
    <div class={styles['library-shell']}>
      <div class={styles['library-shell__top-bar']}>
        <div class={styles['library-shell__top-bar__title']}>{title}</div>
        <div class={styles['library-shell__top-bar__actions']}>{actions}</div>
      </div>
      <div class={styles['library-shell__content']}>{children}</div>
    </div>
  )
}
