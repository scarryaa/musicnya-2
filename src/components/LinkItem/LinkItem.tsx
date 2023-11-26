import Fa from 'solid-fa'
import styles from './LinkItem.module.scss'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { A } from '@solidjs/router'

export const LinkItem = ({ item }) => {
  return (
    <A class={styles['link-item']} href={item.url} target="_blank">
      <span>{item.label}</span>
      <span class={styles['link-item__arrow']}>
        <Fa icon={faChevronRight} size="sm" />
      </span>
    </A>
  )
}
