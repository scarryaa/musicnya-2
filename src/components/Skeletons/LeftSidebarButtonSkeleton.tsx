import styles from './LeftSidebarButtonSkeleton.module.scss'

export const LeftSidebarButtonSkeleton = () => {
  return (
    <div class={styles.skeletonItem}>
      <div class={styles.skeletonText}></div>
    </div>
  )
}
