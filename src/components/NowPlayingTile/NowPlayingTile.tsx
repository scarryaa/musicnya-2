import { A } from '@solidjs/router'
import { store } from '../../stores/store'
import { Utils } from '../../util/util'
import styles from './NowPlayingTile.module.scss'
import Tooltip from '../Tooltip/Tooltip'

export const NowPlayingTile = () => {
  return (
    <div className={styles['now-playing-tile']}>
      <div className={styles['album-cover']}>
        <img src={Utils.formatArtworkUrl(store.currentTrack.artwork, 200)} />
      </div>
      <div className={styles['song-info']}>
        <A
          activeClass=""
          href={`/media/${store.currentTrack.parentType}/${store.currentTrack.parentID}`}
          className={styles['song-info__title']}
        >
          <span
            use:Tooltip={[
              'top',
              store.currentTrack.title,
              true,
              store.app.general.tooltipDelay
            ]}
          >
            {store.currentTrack.title}
          </span>
        </A>
        <div
          className={styles['song-info__artist']}
          use:Tooltip={[
            'top',
            store.currentTrack.artist,
            true,
            store.app.general.tooltipDelay
          ]}
        >
          {store.currentTrack.artist}
        </div>
      </div>
    </div>
  )
}
