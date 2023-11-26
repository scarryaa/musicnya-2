import styles from './LoadingSpinner.module.scss'

export function LoadingSpinner() {
  return (
    <div class={styles['loading-spinner']}>
      <div class={styles['loading-spinner__inner']}></div>
    </div>
  )
}
