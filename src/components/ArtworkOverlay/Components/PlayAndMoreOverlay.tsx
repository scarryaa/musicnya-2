import { ArtworkOverlayProps } from '../Types'
import styles from './Overlay.module.scss'
import { A } from '@solidjs/router'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'

export const PlayAndMoreOverlay = ({
  isLink,
  link,
  isVisible,
  playClick,
  moreClick,
  rounded,
  children,
  roundBottomCorners = true
}: ArtworkOverlayProps) => (
  <div class={styles['artwork-overlay']}>
    <A
      data-testid="artwork-overlay-link"
      style={{
        'pointer-events': isLink ? 'auto' : 'none',
        opacity: isVisible() ? 1 : 0,
        'border-radius': rounded ? '50%' : '0'
      }}
      class={`${styles['artwork-overlay-link']} ${
        roundBottomCorners ? styles['artwork-overlay-link--round-bottom-corners'] : ''
      }`}
      href={isLink ? link : '#'}
      activeClass=""
    >
      <div
        class={styles['artwork-overlay-link-play-button']}
        data-testid="play-button"
        onClick={playClick}
      >
        <Fa icon={faPlay} size="1x" color="var(--color-white)" />
      </div>
      <div
        class={styles['artwork-overlay-link-more-button']}
        data-testid="more-button"
        onClick={moreClick}
      >
        <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
      </div>
    </A>
    {children}
  </div>
)
