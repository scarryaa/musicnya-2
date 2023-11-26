import styles from './LeftSidebarButtonSkeleton.module.scss'

export const LeftSidebarButtonSkeleton = () => {
  return (
    <div class={styles['skeleton-item']}>
      <div class={styles['skeleton-text']}></div>
    </div>
  )
}
