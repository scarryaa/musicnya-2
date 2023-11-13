import {
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createResource,
  createSignal
} from 'solid-js'
import styles from './Album.module.scss'
import { useParams } from '@solidjs/router'
import { fetchAlbum } from '../../../api/album'
import { createAlbumStore } from '../../../stores/api-store'
import { Utils } from '../../../util/util'
import { SongTable } from '../../../components/SongTable/SongTable'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'

export const Album = () => {
  // get params from router
  const params = useParams<{ id: string }>()
  const albumStore = createAlbumStore()
  const albumData = albumStore(params)

  createEffect(() => {
    console.log(albumData())
  })

  return (
    <Switch fallback={<h1>Loading...</h1>}>
      <Match when={albumData.state === 'ready'}>
        <div class={styles.album}>
          <MediaInfo media={albumData().data[0]} />
        </div>

        <SongTable tracks={albumData().data[0].relationships.tracks.data} />
      </Match>
    </Switch>
  )
}
