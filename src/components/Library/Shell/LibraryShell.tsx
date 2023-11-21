import styles from './LibraryShell.module.scss'

type LibraryShellProps = {
  title: string
  actions: any
  children: any
}

export const LibraryShell = ({ children, title, actions }: LibraryShellProps) => {
  return (
    <div class={styles.libraryShell}>
      <div class={styles.libraryShell__topBar}>
        <div class={styles.libraryShell__topBar__title}>{title}</div>
        <div class={styles.libraryShell__topBar__actions}>{actions}</div>
      </div>
      <div class={styles.libraryShell__content}>{children}</div>
    </div>
  )
}
