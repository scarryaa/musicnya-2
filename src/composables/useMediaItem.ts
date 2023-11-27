import { createEffect, createSignal } from 'solid-js'
import { mkManager } from '../api/MkManager'
import { mkApiManager } from '../api/MkApiManager'
import { MediaItemType } from '../types/types'

const useMediaItem = (type: MediaItemType, id: string, artistId: string) => {
  const [newArtistId, setArtistId] = createSignal(artistId)

  const handlePlayClick = (e: MouseEvent) => {
    e.preventDefault()
    mkManager
      .processItemAndPlay(id, type)
      .catch(err => console.error('Error playing item', err))
  }

  createEffect(async () => {
    if (type === 'library-albums') {
      const catalogId = await mkApiManager.getCatalogArtistFromLibrary(artistId)
      setArtistId(catalogId.data[0].id)
      console.log(catalogId)
    }
  })

  return { newArtistId, handlePlayClick }
}

export default useMediaItem
