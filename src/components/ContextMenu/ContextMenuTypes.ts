import { contextMenuItems } from './ContextMenuItems'

export const appContextMenu = () => {
  return ['immersive', 'miniPlayer'].map(itemType => contextMenuItems[itemType])
}

//TODO fix the share link
export const curatorContextMenu = id => {
  return ['share', 'properties'].map(itemType =>
    contextMenuItems[itemType](id, 'curators')
  )
}

//TODO improve types here
export const historyItemContextMenu = (
  id,
  subtype,
  disabled,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const items = []

  const addItem = itemType => {
    const itemConfig = contextMenuItems[itemType](id, subtype)
    if (itemConfig) {
      items.push({ ...itemConfig, disabled })
    }
  }

  if (subtype.includes('stations')) {
    ;['loveQuick', 'dislikeQuick', 'share', 'properties'].forEach(addItem)
  } else if (subtype.includes('playlists')) {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'share',
      'properties'
    ].forEach(addItem)
  } else {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'createStation',
      'goToArtist',
      'goToAlbum',
      'share',
      'properties'
    ].forEach(addItem)
  }

  return items
}

export const artistContextMenu = (id, disabled, isFavoritedState) => {
  return ['createStationQuick', 'favoriteQuick', 'share', 'properties'].map(itemType =>
    contextMenuItems[itemType](id, 'artists', disabled, isFavoritedState)
  )
}

export const songContextMenu = (
  id,
  disabled,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const songType = inLibraryState ? 'library-songs' : 'songs'
  return [
    'addToLibraryQuick',
    'loveQuick',
    'dislikeQuick',
    'playNextQuick',
    'playLastQuick',
    'addToPlaylist',
    'createStation',
    'goToArtist',
    'goToAlbum',
    'share',
    'properties'
  ].map(itemType =>
    contextMenuItems[itemType](
      id,
      songType,
      disabled,
      isLovedState,
      isDislikedState,
      inLibraryState
    )
  )
}

export const mediaItemContextMenu = (
  id,
  disabled = false,
  subType,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const items = []
  console.log(inLibraryState, isLovedState, isDislikedState)

  const addItem = itemType => {
    const itemConfig = contextMenuItems[itemType](
      id,
      subType,
      disabled,
      isLovedState,
      isDislikedState,
      inLibraryState
    )
    items.push(itemConfig)
  }

  if (subType === 'stations') {
    ;['loveQuick', 'dislikeQuick', 'share', 'properties'].forEach(addItem)
  } else if (subType === 'playlists') {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'shuffle',
      'share',
      'properties'
    ].forEach(addItem)
  } else if (subType === 'albums') {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'goToArtist',
      'shuffle',
      'share',
      'properties'
    ].forEach(addItem)
  } else if (subType === 'library-albums') {
    return [
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'goToArtist',
      'shuffle',
      'share',
      'properties'
    ].map(itemType =>
      contextMenuItems[itemType](
        id,
        subType,
        disabled,
        isLovedState,
        isDislikedState,
        inLibraryState
      )
    )
  } else {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'shuffle',
      'share',
      'properties'
    ].forEach(addItem)
  }

  return items
}

export const queueItemContextMenu = (
  id,
  disabled,
  subType,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  return [
    'addToLibraryQuick',
    'loveQuick',
    'dislikeQuick',
    'playNextQuick',
    'playLastQuick',
    'removeFromQueue',
    'addToPlaylist',
    'createStation',
    'goToArtist',
    'goToAlbum',
    'share',
    'properties'
  ].map(itemType =>
    contextMenuItems[itemType](
      id,
      subType,
      disabled,
      isLovedState,
      isDislikedState,
      inLibraryState
    )
  )
}

export const editorialContextMenu = (
  id,
  disabled,
  subType,
  isLovedState,
  isDislikedState,
  inLibraryState
) => {
  const items = []

  const addItem = itemType => {
    const itemConfig = contextMenuItems[itemType](
      id,
      subType,
      disabled,
      isLovedState,
      isDislikedState,
      inLibraryState
    )
    items.push(itemConfig)
  }

  if (subType === 'curators') {
    ;['share', 'properties'].forEach(addItem)
  } else if (subType === 'stations') {
    ;['loveQuick', 'dislikeQuick', 'share', 'properties'].forEach(addItem)
  } else if (subType === 'playlists') {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'shuffle',
      'share',
      'properties'
    ].forEach(addItem)
  } else {
    ;[
      'addToLibraryQuick',
      'loveQuick',
      'dislikeQuick',
      'playNextQuick',
      'playLastQuick',
      'addToPlaylist',
      'goToArtist',
      'shuffle',
      'share',
      'properties'
    ].forEach(addItem)
  }

  return items
}
