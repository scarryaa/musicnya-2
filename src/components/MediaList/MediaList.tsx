import { For, JSX } from 'solid-js'
import styles from './MediaList.module.scss'

type MediaItem = {
  id: string
  type: string
}

type MediaListProps = {
  headers: string[]
  items: () => MediaItem[]
  renderItem: (item: MediaItem) => JSX.Element
}

export const MediaList = ({ headers, items, renderItem }: MediaListProps) => {
  return (
    <table class={styles['media-list']}>
      <thead>
        <tr>
          <For each={headers}>{header => <th>{header}</th>}</For>
        </tr>
      </thead>
      <tbody>
        <For each={items()}>{item => renderItem(item)}</For>
      </tbody>
    </table>
  )
}
