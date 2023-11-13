import Fa from 'solid-fa'
import styles from './PrimaryButton.module.scss'

export const PrimaryButton = ({ _class, text, onClick, icon }) => {
  return (
    <button class={styles.primaryButton + ' ' + _class} onClick={onClick}>
      <div class={styles.primaryButton__icon}>
        <Fa icon={icon} size="1x" color="white" />
      </div>
      <div class={styles.primaryButton__text}>{text}</div>
    </button>
  )
}
