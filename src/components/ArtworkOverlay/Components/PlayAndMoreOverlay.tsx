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
  onFocus,
  onBlur,
  rounded,
  children,
  roundBottomCorners = true
}: ArtworkOverlayProps) => (
  <div class={styles['artwork-overlay']}>
    <A
      onFocus={onFocus}
      onBlur={onBlur}
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
      <button
        class={styles['artwork-overlay-link-play-button']}
        data-testid="play-button"
        onClick={playClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Fa icon={faPlay} size="1x" color="var(--color-white)" />
      </button>
      <button
        class={styles['artwork-overlay-link-more-button']}
        data-testid="more-button"
        onClick={moreClick}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Fa icon={faEllipsisH} size="1x" color="var(--color-white)" />
      </button>
    </A>
    {children}
  </div>
)
