import { JSX } from 'solid-js'
import styles from './SettingItem.module.scss'

type SettingItemProps = {
  title: string
  children: JSX.Element
  subtitle?: string
}

export const SettingItem = (props: SettingItemProps) => (
  <div class={styles.setting}>
    <div class={styles.setting__titleContainer}>
      <span class={styles.setting__titleContainer__title}>{props.title}</span>
      <span class={styles.setting__titleContainer__subtitle}>{props.subtitle}</span>
    </div>
    {props.children}
  </div>
)
