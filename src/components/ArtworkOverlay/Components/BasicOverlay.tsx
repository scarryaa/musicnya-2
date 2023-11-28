import styles from './Overlay.module.scss'
import { A } from '@solidjs/router'
import { ArtworkOverlayProps } from '../Types'

export const BasicOverlay = ({
  isLink,
  link,
  children,
  isVisible,
  rounded = false,
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
    ></A>
    {children}
  </div>
)
