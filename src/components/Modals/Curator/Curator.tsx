import { createEffect } from 'solid-js'
import styles from './Curator.module.scss'

export const Curator = ({ curatorId }) => {
  createEffect(() => {
    console.log(curatorId)
  })

  return (
    <div class={styles.curator}>
      <h1>Curator</h1>
    </div>
  )
}
