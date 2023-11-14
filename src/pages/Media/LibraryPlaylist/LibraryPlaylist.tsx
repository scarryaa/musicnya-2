import { useParams } from '@solidjs/router'
import { createSignal, createEffect, Show } from 'solid-js'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { SongTable } from '../../../components/SongTable/SongTable'
import { store } from '../../../stores/store'
import styles from './LibraryPlaylist.module.scss'

export const LibraryPlaylist = () => {
  const params = useParams<{ id: string }>()
  const [playlistData, setPlaylistData] = createSignal(null)
  let playlistPage: HTMLDivElement = undefined as unknown as HTMLDivElement

  createEffect(() => {
    let newPlaylistData = store.libraryPlaylists.find(
      playlist => playlist.id === params.id
    )

    setPlaylistData(newPlaylistData)
  }, [params.id])

  createEffect(() => {
    // scroll to top of page
    if (playlistPage) playlistPage.scrollTop = 0
  }, [playlistData(), params.id, playlistPage])

  return (
    <Show when={playlistData()}>
      <div class={styles.libraryPlaylist} ref={playlistPage}>
        <MediaInfo media={playlistData} />
      </div>
      <SongTable data={playlistData} />
    </Show>
  )
}
