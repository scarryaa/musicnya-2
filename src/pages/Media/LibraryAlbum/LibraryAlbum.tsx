import { Match, Switch, createEffect } from 'solid-js'
import styles from './LibraryAlbum.module.scss'
import { useParams } from '@solidjs/router'
import { createAlbumStore } from '../../../stores/api-store'
import { SongTable } from '../../../components/SongTable/SongTable'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'
import { store } from '../../../stores/store'

export const LibraryAlbum = () => {
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
        <div class={styles.libraryAlbum}>
          <MediaInfo media={albumData().data[0]} />
        </div>

        {albumData().data[0].relationships.catalog.data[0].attributes.editorialNotes
          .standard &&
          !store.app.media.hideEditorialNotes && (
            <EditorialNotes data={albumData().data[0].relationships.catalog.data[0]} />
          )}

        <SongTable
          tracks={albumData().data[0].relationships.tracks.data}
          type={albumData().data[0].type}
        />
      </Match>
    </Switch>
  )
}
