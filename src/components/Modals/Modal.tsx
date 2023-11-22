import Fa from 'solid-fa'
import { setStore, store } from '../../stores/store'
import styles from './Modal.module.scss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Curator } from './Curator/Curator'
import { Playlist } from './Playlist/Playlist'
import { Album } from './Album/Album'
import { Artist } from './Artist/Artist'
import { Song } from './Song/Song'
import { Station } from './Station/Station'

export const Modal = () => {
  const handleModalClose = () => {
    const modalContent = document.querySelector(`.${styles.modal__content}`)
    modalContent?.classList.add(styles['--popOut'])

    const modalOverlay = document.querySelector(`.${styles.modal__overlay}`)
    modalOverlay?.classList.add(styles['--fadeOut'])

    // wait for the animation to finish
    setTimeout(() => {
      setStore('app', 'modal', { open: false, type: '', id: '' })
      modalContent?.classList.remove(styles['--popOut'])
      modalOverlay?.classList.remove(styles['--fadeOut'])
    }, 200)
  }

  return (
    <div class={styles.modal} style={{ display: store.app.modal.open ? 'flex' : 'none' }}>
      <div
        onClick={handleModalClose}
        class={`${styles.modal__overlay} ${styles['--fadeIn']}`}
      ></div>
      <div
        class={`${styles.modal__content} ${
          store.app.modal.open ? styles['--popIn'] : ''
        }`}
      >
        <div class={styles.modal__header}>
          <div class={styles.modal__header__closeButton} onClick={handleModalClose}>
            <Fa icon={faTimes} />
          </div>
        </div>
        <div class={styles.modal__body}>
          <div class={styles.modal__body__text}>
            {store.app.modal.type === 'curators' && <Curator />}
            {store.app.modal.type.includes('playlists') && <Playlist />}
            {store.app.modal.type.includes('albums') && <Album />}
            {store.app.modal.type.includes('artists') && <Artist />}
            {store.app.modal.type.includes('songs') && <Song />}
            {store.app.modal.type === 'stations' && <Station />}
          </div>
        </div>
      </div>
    </div>
  )
}
