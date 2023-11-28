import { For } from 'solid-js'
import styles from './MediaSelector.module.scss'
import { MediaItem } from '../MediaItem/MediaItem'
import { MediaItemGlass } from '../MediaItemGlass/MediaItemGlass'
import { Shelf } from '../Shelf/Shelf'
import { Utils } from '../../util/util'
import musicNote from '../../assets/music_note.png'
import { EditorialItem } from '../EditorialItem/EditorialItem'
import { LinkItem } from '../LinkItem/LinkItem'
import { EditorialItemSmall } from '../EditorialItemSmall/EditorialItemSmall'
import { SongItem } from '../SongItem/SongItem'
import { VideoItem } from '../VideoItem/VideoItem'
import { EditorialItemLarge } from '../EditorialItemLarge/EditorialItemLarge'
import { store } from '../../stores/store'
import { CuratorItem } from '../CuratorItem/CuratorItem'
import { ArtistItem } from '../ArtistItem/ArtistItem'

export const MediaSelector = ({ item }) => {
  const isMusicNotesHeroShelf = item.attributes?.display?.kind === 'MusicNotesHeroShelf'
  const isMusicSuperHeroShelf = item.attributes?.display?.kind === 'MusicSuperHeroShelf'
  const childType = item.relationships?.children?.data?.[0]?.type
  const editorialElementKind = item.attributes?.editorialElementKind

  const renderItem = mediaItem => {
    return renderMediaItem(mediaItem, childType, isMusicNotesHeroShelf)
  }

  const renderShelf = data => (
    <Shelf header={item.attributes.name} topMargin={!isMusicNotesHeroShelf}>
      <For each={data}>{renderItem}</For>
    </Shelf>
  )

  function renderMediaItem(mediaItem, childType, isMusicNotesHeroShelf) {
    const commonProps = {
      id: mediaItem.id,
      type: mediaItem.type,
      title:
        mediaItem.attributes?.name || mediaItem.attributes?.plainEditorialNotes?.name,
      src: Utils.formatArtworkUrl(
        mediaItem.attributes?.artwork?.url ||
          mediaItem.attributes?.editorialArtwork?.superHeroTall?.url ||
          musicNote,
        400
      )
    }

    if (isMusicNotesHeroShelf) {
      return (
        <MediaItemGlass
          {...commonProps}
          reason={mediaItem?.meta?.reason?.stringForDisplay}
          artists={[mediaItem.attributes.artistName]}
        />
      )
    }

    if (isMusicSuperHeroShelf) {
      return <EditorialItemLarge item={mediaItem} />
    }

    switch (mediaItem?.attributes?.editorialElementKind) {
      case '316':
        return <div>hello</div>
      case '386':
      case '394':
        return <EditorialItemSmall item={mediaItem} />
      case '336':
      case '339':
        return (
          <For each={mediaItem.relationships.contents.data}>
            {childItem => renderMediaItem(childItem, childType, isMusicNotesHeroShelf)}
          </For>
        )
      default:
        break
    }

    switch (mediaItem.type) {
      case 'songs':
        return <SongItem album={null} albumId={null} item={mediaItem} />
      case 'uploaded-videos':
        return <VideoItem item={mediaItem} />
      case 'music-videos':
        return <VideoItem item={mediaItem} />
      case 'apple-curators':
        return <CuratorItem item={mediaItem} />
      case 'artists':
        return <ArtistItem item={mediaItem} />
      default:
        break
    }

    if (childType === 'editorial-elements') {
      return <EditorialItem item={mediaItem} />
    }

    return (
      <MediaItem
        {...commonProps}
        id={mediaItem.id}
        artists={[mediaItem.attributes?.artistName]}
        artistId={mediaItem.relationships?.artists?.data?.[0]?.id}
        curator={mediaItem.attributes?.curatorName}
        curatorId={mediaItem.relationships?.curator?.data?.[0]?.id}
      />
    )
  }

  switch (editorialElementKind) {
    case '316':
    case '385':
    case '323':
      if (item.attributes?.name === 'Chart Set') return null
      return renderShelf(item.relationships.children.data)
    case '326':
    case '387':
    case '327':
      return renderShelf(item.relationships.contents.data)
    case '322':
    case '391':
      if (store.app.media.hideLinkTiles) {
        return null
      } else {
        return (
          <div class={styles['link-item-container']}>
            <For each={item.attributes.links}>{item => <LinkItem item={item} />}</For>
          </div>
        )
      }

    case '332':
      return null
    case '488':
      return null
    default:
      return (
        <div class={styles['media-selector']}>
          <Shelf
            header={item.attributes.title?.stringForDisplay}
            topMargin={item.attributes?.display?.kind !== 'MusicNotesHeroShelf'}
          >
            <For each={item.relationships?.contents?.data}>{renderItem}</For>
          </Shelf>
        </div>
      )
  }
}
