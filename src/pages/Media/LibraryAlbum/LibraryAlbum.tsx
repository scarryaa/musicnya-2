import { useParams } from '@solidjs/router'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { SongTable } from '../../../components/SongTable/SongTable'
import { createAlbumStore } from '../../../stores/api-store'
import { store } from '../../../stores/store'
import styles from './LibraryAlbum.module.scss'

export const LibraryAlbum = () => {
  const params = useParams<{ id: string }>()
  const albumStore = createAlbumStore()
  const albumData = albumStore(params)

  const [currentAlbum, setCurrentAlbum] = createSignal(null)

  createEffect(() => {
    const data = albumData()
    if (data && data.data && data.data.length > 0) {
      setCurrentAlbum(data.data[0])
    }
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={albumData.state === 'ready' && currentAlbum()}>
        <div class={styles.libraryAlbum}>
          <MediaInfo media={currentAlbum} />
        </div>

        {currentAlbum().relationships.catalog.data[0].attributes.editorialNotes
          ?.standard &&
          !store.app.media.hideEditorialNotes && <EditorialNotes data={currentAlbum} />}

        <SongTable data={currentAlbum} />
      </Match>
    </Switch>
  )
}
