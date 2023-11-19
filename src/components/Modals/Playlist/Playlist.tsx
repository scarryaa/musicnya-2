import { createEffect } from 'solid-js'
import styles from './Playlist.module.scss'

export const Playlist = ({ playlistId }) => {
  createEffect(() => {
    console.log(playlistId)
  })

  return (
    <div class={styles.playlist}>
      <h1>Playlist</h1>
    </div>
  )
}
