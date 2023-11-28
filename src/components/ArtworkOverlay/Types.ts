import { Accessor, JSX } from 'solid-js'

export type ArtworkOverlayProps = {
  type: ArtworkOverlayType
  isLink: boolean
  link?: string
  children?: JSX.Element
  isVisible?: Accessor<boolean>
  playClick?: (e) => void
  moreClick?: (e) => void
  roundBottomCorners?: boolean
  rounded?: boolean
}

export enum ArtworkOverlayType {
  PLAY_AND_MORE,
  PLAY,
  MORE,
  NONE
}
