import Fa from 'solid-fa'
import styles from './LinkItem.module.scss'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'

export const LinkItem = ({ item }) => {
  console.log(item)

  return (
    <A class={styles.linkItem} href={item.url} target="_blank">
      <span>{item.label}</span>
      <span class={styles.linkItem__arrow}>
        <Fa icon={faChevronRight} size="sm" />
      </span>
    </A>
  )
}
