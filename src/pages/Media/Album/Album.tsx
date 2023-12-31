import { A, useParams } from '@solidjs/router'
import { Match, Switch, createEffect, createSignal } from 'solid-js'
import { EditorialNotes } from '../../../components/EditorialNotes/EditorialNotes'
import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner'
import { MediaInfo } from '../../../components/MediaInfo/MediaInfo'
import { SongTable } from '../../../components/SongTable/SongTable'
import { createAlbumStore } from '../../../stores/api-store'
import { store } from '../../../stores/store'
import styles from './Album.module.scss'
import { BaseLink } from '../../../components/BaseLink/BaseLink'

export const Album = () => {
  const params = useParams<{ id: string }>()
  const albumStore = createAlbumStore()
  const albumData = albumStore(params)

  const [currentAlbum, setCurrentAlbum] = createSignal(null)

  createEffect(() => {
    const data = albumData()
    if (data && data.data && data.data.length > 0) {
      setCurrentAlbum(data.data[0])
    }
    console.log(currentAlbum())
  })

  return (
    <Switch fallback={<LoadingSpinner />}>
      <Match when={albumData.state === 'ready' && currentAlbum()}>
        <div class={styles.album}>
          <MediaInfo
            media={currentAlbum}
            artistId={currentAlbum().relationships.artists.data[0].id}
          />
        </div>

        {(currentAlbum().attributes.editorialNotes?.standard ||
          currentAlbum().attributes.editorialNotes?.short) &&
          !store.app.media.hideEditorialNotes && <EditorialNotes data={currentAlbum} />}
        <SongTable data={currentAlbum} />
        {currentAlbum().type === 'library-albums' && (
          <div class={styles.album__footer}>
            <BaseLink
              activeClass={styles.album__footer__showCompleteAlbumLink__active}
              aria-label="Show Complete Album"
              class={styles.album__footer__showCompleteAlbumLink}
              href={`/media/albums/${currentAlbum().relationships.catalog.data[0].id}`}
            >
              Show Catalog Album
            </BaseLink>
          </div>
        )}
      </Match>
    </Switch>
  )
}
