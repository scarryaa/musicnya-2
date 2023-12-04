import { Switch, Match, createSignal } from 'solid-js'
import { LoadingSpinner } from '../../../../components/LoadingSpinner/LoadingSpinner'
import { store } from '../../../../stores/store'
import { Utils } from '../../../../util/util'
import styles from './SongView.module.scss'
import { MediaList } from '../../../../components/MediaList/MediaList'
import { MediaListItem } from '../../../../components/MediaList/Components/MediaListItem/MediaListItem'

type SongViewProps = {
  songs: () => MusicKit.Songs[]
  headers: string[]
}

export const SongView = ({ songs, headers }: SongViewProps) => {
  const [flex, setFlex] = createSignal(window.innerWidth <= 1000)

  window.addEventListener('resize', () => {
    setFlex(window.innerWidth <= 1000)
  })

  console.log(songs())
  const renderMediaListItem = item => (
    <MediaListItem
      id={item.id}
      type={item.type}
      imageUrl={Utils.formatArtworkUrl(item.attributes.artwork.url, 25)}
      secondaryText={item.attributes.artistName}
      primaryText={item.attributes.name}
      secondaryUrl={`/media/artists/${item.relationships.artists.data[0].relationships.catalog.data[0].id}`}
      url={`/media/albums/${item.relationships.albums.data[0].relationships.catalog.data[0].id}`}
      additionalInfo={[Utils.formatTime(item.attributes.durationInMillis / 1000)]}
      quaternaryText={item.attributes.albumName}
      quaternaryUrl={`/media/albums/${item.relationships.albums.data[0].relationships.catalog.data[0].id}`}
      primaryClass={styles['song-title']}
      secondaryClass={styles['song-artist']}
      quaternaryClass={styles['song-album']}
      quinaryClass={styles['song-time']}
      flex={flex}
    />
  )

  return (
    <div class={styles['song-view']}>
      <Switch>
        <Match when={store.library.songs.length === 0}>
          <LoadingSpinner />
        </Match>
        <Match when={store.library.songs.length > 0}>
          <div class={styles['song-view-list']}>
            <MediaList headers={headers} items={songs} renderItem={renderMediaListItem} />
          </div>
        </Match>
      </Switch>
    </div>
  )
}
