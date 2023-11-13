import { For } from 'solid-js'
import styles from './SongTable.module.scss'
import { Utils } from '../../util/util'
import { mkController } from '../../api/mkController'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'

export const SongTable = ({ tracks }) => {
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
            {track => (
              <tr onDblClick={() => mkController.playMediaItem(track.id, track.type)}>
                <td class={styles.album__tracks__table__number}>
                  <span>{track.attributes.trackNumber}</span>
                  <div class={styles.album__tracks__table__number__playButton}>
                    <Fa icon={faPlay} size="1x" color="white" />
                  </div>
                </td>
                <td>
                  <div class={styles.album__tracks__table__title}>
                    {track.attributes.name}
                  </div>
                  <div class={styles.album__tracks__table__artist}>
                    {track.attributes.artistName}
                  </div>
                </td>
                <td>
                  <div class={styles.album__tracks__table__time}>
                    <span>
                      {Utils.formatTime(track.attributes.durationInMillis / 1000)}
                    </span>
                    <div class={styles.album__tracks__table__time__moreButton}>
                      <Fa icon={faEllipsisH} size="1x" color="white" />
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
