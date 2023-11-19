import { createEffect } from 'solid-js'
import styles from './Album.module.scss'

export const Album = ({ albumId }) => {
  createEffect(() => {
    console.log(albumId)
  })

  return (
    <div class={styles.album}>
      <h1>Album</h1>
    </div>
  )
}
