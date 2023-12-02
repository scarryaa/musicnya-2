import { For } from 'solid-js'
import { MediaListItem } from './Components/MediaListItem/MediaListItem'
import styles from './MediaList.module.scss'

export const MediaList = ({
  headers,
  items
}: {
  headers: string[]
  items: () => any[]
}) => {
  return (
    <table class={styles['media-list']}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Date Added</th>
          <th>Release Date</th>
        </tr>
      </thead>
      <tbody>
        <For each={items()}>{item => <MediaListItem item={item} />}</For>
      </tbody>
    </table>
  )
}
