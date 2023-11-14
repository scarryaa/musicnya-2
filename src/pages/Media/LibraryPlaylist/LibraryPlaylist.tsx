import { useParams } from '@solidjs/router'
import { createSignal, createEffect, Show } from 'solid-js'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { SongTable } from '../../../components/SongTable/SongTable'
import { store } from '../../../stores/store'
import styles from './LibraryPlaylist.module.scss'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'

export const LibraryPlaylist = () => {
  const params = useParams<{ id: string }>()
  const [playlistData, setPlaylistData] = createSignal(null)
  let playlistPage: HTMLDivElement = undefined as unknown as HTMLDivElement

  createEffect(() => {
    let newPlaylistData = store.libraryPlaylists.find(
      playlist => playlist.id === params.id
    )

    setPlaylistData(newPlaylistData)
    playlistPage.scrollTop = 0
  }, [params.id])

  return (
    <div class={styles.libraryPlaylist} ref={playlistPage}>
      <Show when={playlistData()}>
        <MediaInfo media={playlistData} />

        {playlistData().relationships.catalog.data[0].attributes.editorialNotes
          ?.standard &&
          !store.app.media.hideEditorialNotes && <EditorialNotes data={playlistData} />}
        <SongTable data={playlistData} />
      </Show>
    </div>
  )
}
