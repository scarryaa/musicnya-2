import { For } from 'solid-js'
import styles from './MediaSelector.module.scss'
import { MediaItem } from '../MediaItem/MediaItem'
import { Utils } from '../../util/util'
import musicNote from '../../assets/music_note.png'
import { Shelf } from '../Shelf/Shelf'
import { MediaItemGlass } from '../MediaItemGlass/MediaItemGlass'

export const MediaSelector = ({ item }: { item: any }) => {
  return (
    <div style={styles.mediaSelector}>
      <Shelf
        header={item.attributes.title?.stringForDisplay}
        topMargin={item.attributes.display.kind !== 'MusicNotesHeroShelf'}
      >
        {item.attributes.display?.kind &&
        item.attributes.display.kind === 'MusicNotesHeroShelf' ? (
          <For each={item.relationships.contents.data}>
            {mediaItem => (
              <MediaItemGlass
                reason={mediaItem?.meta?.reason?.stringForDisplay}
                id={mediaItem.id}
                type={mediaItem.type}
                title={mediaItem.attributes.name}
                artists={[mediaItem.attributes.artistName]}
                src={Utils.formatArtworkUrl(
                  mediaItem.attributes?.artwork?.url || musicNote,
                  200
                )}
              />
            )}
          </For>
        ) : (
          <For each={item.relationships.contents.data}>
            {mediaItem => (
              <MediaItem
                id={mediaItem.id}
                type={mediaItem.type}
                title={mediaItem.attributes.name}
                artists={[
                  mediaItem.attributes.artistName ||
                    mediaItem.attributes.curatorName ||
                    ' '
                ]}
                src={Utils.formatArtworkUrl(
                  mediaItem.attributes?.artwork?.url || musicNote,
                  200
                )}
              />
            )}
          </For>
        )}
      </Shelf>
    </div>
  )
}
