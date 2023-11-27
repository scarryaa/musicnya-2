import { A } from '@solidjs/router'
import styles from './ArtworkOverlay.module.scss'
import Fa from 'solid-fa'
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons'
import { Accessor, JSX } from 'solid-js'

export enum ArtworkOverlayType {
  PLAY_AND_MORE,
  MORE
}

type ArtworkOverlayProps = {
  type: ArtworkOverlayType
  isLink: boolean
  link?: string
  children?: JSX.Element
  isVisible?: Accessor<boolean>
  playClick?: (e) => void
  moreClick?: (e) => void
  roundBottomCorners?: boolean
}

export const ArtworkOverlay = ({
  type,
  isLink,
  link,
  children,
  isVisible,
  playClick,
  moreClick,
  roundBottomCorners = true
}: ArtworkOverlayProps) => {
  if (type === ArtworkOverlayType.PLAY_AND_MORE) {
    return (
      <div class={styles['artwork-overlay']}>
        <A
          data-testid="artwork-overlay-link"
          style={{
            'pointer-events': isLink ? 'auto' : 'none',
            opacity: isVisible() ? 1 : 0
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
  } else if (type === ArtworkOverlayType.MORE) {
    return <div>more</div>
  }
}
