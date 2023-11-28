import { BasicOverlay } from './Components/BasicOverlay'
import { MoreOverlay } from './Components/MoreOverlay'
import { PlayAndMoreOverlay } from './Components/PlayAndMoreOverlay'
import { PlayOverlay } from './Components/PlayOverlay'
import { ArtworkOverlayProps, ArtworkOverlayType } from './Types'

export const ArtworkOverlay = (props: ArtworkOverlayProps) => {
  switch (props.type) {
    case ArtworkOverlayType.PLAY_AND_MORE:
      return <PlayAndMoreOverlay {...props} />
    case ArtworkOverlayType.MORE:
      return <MoreOverlay {...props} />
    case ArtworkOverlayType.PLAY:
      return <PlayOverlay {...props} />
    case ArtworkOverlayType.NONE:
    default:
      return <BasicOverlay {...props} />
  }
}
