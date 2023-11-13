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
          <img
            src={Utils.formatArtworkUrl(albumData().data[0].attributes.artwork.url, 300)}
            class={styles.album__artwork}
          />
          <div class={styles.album__info}>
            <h1 class={styles.album__info__title}>
              {albumData().data[0].attributes.name}
            </h1>
            <h2 class={styles.album__info__artist}>
              {albumData().data[0].attributes.artistName}
            </h2>
            <h3 class={styles.album__info__genre}>
              {albumData().data[0].attributes.genreNames[0]} •{' '}
              {albumData().data[0].attributes.releaseDate.slice(0, 4)}
            </h3>
          </div>
        </div>

        <SongTable tracks={albumData().data[0].relationships.tracks.data} />
      </Match>
    </Switch>
  )
}
