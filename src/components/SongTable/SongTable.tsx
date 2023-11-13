import { For } from 'solid-js'
import styles from './SongTable.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'

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
                  <span>{index() + 1}</span>
                  <div class={styles.album__tracks__table__number__playButton}>
                    <Fa icon={faPlay} size="1x" color="var(--app-text-color)" />
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
