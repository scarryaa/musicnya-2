import { For } from 'solid-js'
import { MediaListItem } from './Components/MediaListItem/MediaListItem'

export const MediaList = () => {
  return <For each={['a', 'b', 'c']}>{item => <MediaListItem />}</For>
}
