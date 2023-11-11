import { store } from '../../stores/store'
import { NowPlayingTile } from '../NowPlayingTile/NowPlayingTile'
import { MiscControls } from '../Player/MiscControls'
import { Player } from '../Player/Player'
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer class={styles.footer}>
      <div class={styles.footer__left}>
        <NowPlayingTile />
      </div>
      <div class={styles.footer__center}>
        <Player />
      </div>
      <div class={styles.footer__right}>
        <MiscControls />
      </div>
    </footer>
  )
}
