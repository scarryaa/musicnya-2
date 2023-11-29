import styles from './Blurb.module.scss'

export const Blurb = ({ blurb }: { blurb: string }) => {
  return (
    <div class={styles['blurb']}>
      <span class={styles['blurb-text']}>{blurb}</span>
    </div>
  )
}
