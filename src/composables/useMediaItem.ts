import { createEffect, createMemo, createSignal } from 'solid-js'
import { mkManager } from '../api/MkManager'
import { mkApiManager } from '../api/MkApiManager'
import { MediaItemType } from '../types/types'

const useMediaItem = (
  type: MediaItemType,
  id: string,
  artistId: string,
  releaseYear: number
) => {
  const [newArtistId, setArtistId] = createSignal(artistId)

  const handlePlayClick = (e: MouseEvent) => {
    e.preventDefault()
    mkManager
      .processItemAndPlay(id, type)
      .catch(err => console.error('Error playing item', err))
  }

  const isAppleCurator = createMemo(() => type === 'apple-curators')
  const subtitleLink = createMemo(() =>
    releaseYear
      ? '#'
      : isAppleCurator()
      ? `/media/curators/`
      : `/media/artists/${newArtistId()}`
  )

  createEffect(async () => {
    if (type === 'library-albums') {
      const catalogId = await mkApiManager.getCatalogArtistFromLibrary(artistId)
      setArtistId(catalogId.data[0].id)
      console.log(catalogId)
    }
  })

  return {
    isAppleCurator,
    handlePlayClick,
    subtitleLink
  }
}

export default useMediaItem
