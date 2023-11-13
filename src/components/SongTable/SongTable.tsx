import { For } from 'solid-js'
import styles from './SongTable.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'
import Fa from 'solid-fa'
import { faEllipsisH, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { store } from '../../stores/store'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export const SongTable = ({ tracks, type }) => {
  return (
    <div class={styles.album__tracks}>
      <table class={styles.album__tracks__table}>
        <thead>
          <tr>
            <th class={styles.album__tracks__table__number}>#</th>
            <th>Title</th>
            <th class={styles.album__tracks__table__time}>Time</th>
          </tr>
        </thead>
        <tbody>
          <For each={tracks}>
            {(track, index) => (
              <tr onDblClick={() => mkController.playMediaItem(track.id, track.type)}>
                <td class={styles.album__tracks__table__number}>
                  <span class={styles.album__tracks__table__number__popularity}>
                    {track.meta.popularity > 0.7 && (
                      <Fa icon={faStar} color="var(--app-text-color)" size="xs" />
                    )}
                  </span>
                  <span class={styles.album__tracks__table__number__number}>
                    {index() + 1}
                  </span>
                  <div class={styles.album__tracks__table__number__playButton}>
                    {track.id === store.currentTrack.id ? (
                      <Fa icon={faPause} size="1x" color="var(--app-primary-color)" />
                    ) : (
                      <Fa icon={faPlay} size="1x" color="var(--app-text-color)" />
                    )}
                  </div>
                </td>
                <td>
                  <div class={styles.album__tracks__table__title}>
                    {type !== 'albums' && type !== 'library-albums' && (
                      <div class={styles.album__tracks__table__title__albumCover}>
                        <img
                          src={Utils.formatArtworkUrl(track.attributes.artwork.url, 50)}
                        />
                      </div>
                    )}
                    <div class={styles.album__tracks__table__title__name__artist}>
                      <span
                        class={styles.album__tracks__table__title__name__artist__name}
                        style={{
                          color:
                            track.id === store.currentTrack.id
                              ? 'var(--app-primary-color)'
                              : 'var(--app-text-color)'
                        }}
                      >
                        {track.attributes.name}
                      </span>
                      <div
                        class={styles.album__tracks__table__title__name__artist__artist}
                      >
                        {track.attributes.artistName}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class={styles.album__tracks__table__time}>
                    <span>
                      {Utils.formatTime(track.attributes.durationInMillis / 1000)}
                    </span>
                    <div class={styles.album__tracks__table__time__moreButton}>
                      <Fa icon={faEllipsisH} size="1x" color="var(--app-text-color)" />
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
