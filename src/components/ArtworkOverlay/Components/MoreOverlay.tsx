import { A } from '@solidjs/router'
import styles from './Overlay.module.scss'
import { ArtworkOverlayProps } from '../Types'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Fa from 'solid-fa'

export const MoreOverlay = ({
  isLink,
  link,
  isVisible,
  moreClick,
  rounded,
  children,
  roundBottomCorners = true
}: ArtworkOverlayProps) => (
  <div class={styles['artwork-overlay']}>
    <A
      activeClass=""
      href={isLink ? link : '#'}
      data-testid="artwork-overlay-link"
      style={{
        'pointer-events': isLink ? 'auto' : 'none',
        opacity: isVisible() ? 1 : 0,
        'justify-content': 'flex-end',
        'border-radius': rounded ? '50%' : '0'
      }}
      class={`${styles['artwork-overlay-link']} ${
        roundBottomCorners ? styles['artwork-overlay-link--round-bottom-corners'] : ''
      }`}
    >
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
