import Fa from 'solid-fa'
import styles from './PrimaryButton.module.scss'

export const PrimaryButton = ({ _class, text, onClick, icon }) => {
  return (
    <button class={`${styles['primary-button']} ${_class}`} onClick={onClick}>
      <div class={styles['primary-button__icon']}>
        <Fa icon={icon} size="1x" color="white" />
      </div>
      <div class={styles['primary-button__text']}>{text}</div>
    </button>
  )
}
