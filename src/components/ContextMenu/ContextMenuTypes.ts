import {
  AddToLibraryQuickItem,
  AddToPlaylistItem,
  CreateStationItem,
  CreateStationQuickItem,
  DislikeQuickItem,
  FavoriteQuickItem,
  GoToAlbumItem,
  GoToArtistItem,
  ImmersiveItem,
  LoveQuickItem,
  MiniPlayerItem,
  PlayLastQuickItem,
  PlayNextQuickItem,
  PropertiesItem,
  RemoveFromQueueItem,
  ShareItem,
  ShuffleItem
} from './ContextMenuItems'

export const appContextMenu = () => {
  return [ImmersiveItem(), MiniPlayerItem()]
}

//TODO fix the share link
export const curatorContextMenu = id => {
  return [ShareItem(id, 'curators'), PropertiesItem(id, 'curators')]
}

//TODO improve types here
export const historyItemContextMenu = (
  id: string,
  subtype: string,
  disabled,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  let items = []

  if (subtype.includes('stations')) {
    items = [
      LoveQuickItem(id, 'stations', disabled, isLovedState),
      DislikeQuickItem(id, 'stations', disabled, isDislikedState),
      ShareItem(id, 'stations'),
      PropertiesItem(id, 'stations')
    ]
  } else if (subtype.includes('playlists')) {
    items = [
      AddToLibraryQuickItem(id, 'playlists', disabled, inLibraryState),
      LoveQuickItem(id, 'playlists', disabled, isLovedState),
      DislikeQuickItem(id, 'playlists', disabled, isDislikedState),
      PlayNextQuickItem(id, 'playlists'),
      PlayLastQuickItem(id, 'playlists'),
      AddToPlaylistItem(id, 'playlists'),
      ShareItem(id, 'playlists'),
      PropertiesItem(id, 'playlists')
    ]
  } else {
    items = [
      AddToLibraryQuickItem(id, 'songs', disabled, inLibraryState),
      LoveQuickItem(id, 'songs', disabled, isLovedState),
      DislikeQuickItem(id, 'songs', disabled, isDislikedState),
      PlayNextQuickItem(id, 'songs'),
      PlayLastQuickItem(id, 'songs'),
      AddToPlaylistItem(id, 'songs'),
      CreateStationItem(id, 'songs'),
      GoToArtistItem(id, 'songs'),
      GoToAlbumItem(id, 'songs'),
      ShareItem(id, 'songs'),
      PropertiesItem(id, 'songs')
    ]
  }

  return items
}

export const artistContextMenu = (id: string, disabled, isFavoritedState) => {
  return [
    CreateStationQuickItem(id, 'artists'),
    FavoriteQuickItem(id, 'artists', disabled, isFavoritedState),
    ShareItem(id, 'artists'),
    PropertiesItem(id, 'artists')
  ]
}

export const songContextMenu = (
  id: string,
  disabled,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  const songType = inLibraryState ? 'library-songs' : 'songs'
  return [
    AddToLibraryQuickItem(
      id,
      inLibraryState ? 'library-songs' : 'songs',
      disabled,
      inLibraryState
    ),
    LoveQuickItem(id, inLibraryState ? 'library-songs' : 'songs', disabled, isLovedState),
    DislikeQuickItem(
      id,
      inLibraryState ? 'library-songs' : 'songs',
      disabled,
      isDislikedState
    ),
    PlayNextQuickItem(id, songType),
    PlayLastQuickItem(id, songType),
    AddToPlaylistItem(id, songType),
    CreateStationItem(id, songType),
    GoToArtistItem(id, songType),
    GoToAlbumItem(id, songType),
    ShareItem(id, songType),
    PropertiesItem(id, songType)
  ]
}

export const mediaItemContextMenu = (
  id: string,
  disabled,
  subType: string,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  let items = []

  if (subType.includes('stations')) {
    console.log('station')
    items = [
      LoveQuickItem(id, 'stations', disabled, isLovedState),
      DislikeQuickItem(id, 'stations', disabled, isDislikedState),
      ShareItem(id, 'stations'),
      PropertiesItem(id, 'stations')
    ]
  } else if (subType === 'playlists') {
    items = [
      AddToLibraryQuickItem(id, 'playlists', disabled, inLibraryState),
      LoveQuickItem(id, 'playlists', disabled, isLovedState),
      DislikeQuickItem(id, 'playlists', disabled, isDislikedState),
      PlayNextQuickItem(id, 'playlists'),
      PlayLastQuickItem(id, 'playlists'),
      AddToPlaylistItem(id, 'playlists'),
      ShuffleItem(id, 'playlists'),
      ShareItem(id, 'playlists'),
      PropertiesItem(id, 'playlists')
    ]
  } else if (subType.includes('albums')) {
    items = [
      AddToLibraryQuickItem(id, subType, disabled, inLibraryState),
      LoveQuickItem(id, subType, disabled, isLovedState),
      DislikeQuickItem(id, subType, disabled, isDislikedState),
      PlayNextQuickItem(id, subType),
      PlayLastQuickItem(id, subType),
      AddToPlaylistItem(id, subType),
      GoToArtistItem(id, subType),
      ShuffleItem(id, subType),
      ShareItem(id, subType),
      PropertiesItem(id, subType)
    ]
  } else {
    items = [
      AddToLibraryQuickItem(id, subType, disabled, inLibraryState),
      LoveQuickItem(id, subType, disabled, isLovedState),
      DislikeQuickItem(id, subType, disabled, isDislikedState),
      PlayNextQuickItem(id, subType),
      PlayLastQuickItem(id, subType),
      AddToPlaylistItem(id, subType),
      ShuffleItem(id, subType),
      ShareItem(id, subType),
      PropertiesItem(id, subType)
    ]
  }

  return items
}

export const queueItemContextMenu = (
  id: string,
  disabled,
  subType: string,
  isLovedState = false,
  isDislikedState = false,
  inLibraryState = false
) => {
  return [
    AddToLibraryQuickItem(id, subType, disabled, inLibraryState),
    LoveQuickItem(id, subType, disabled, isLovedState),
    DislikeQuickItem(id, subType, disabled, isDislikedState),
    PlayNextQuickItem(id, subType),
    PlayLastQuickItem(id, subType),
    RemoveFromQueueItem(id, subType),
    AddToPlaylistItem(id, subType),
    CreateStationItem(id, subType),
    GoToArtistItem(id, subType),
    GoToAlbumItem(id, subType),
    ShareItem(id, subType),
    PropertiesItem(id, subType)
  ]
}

export const editorialContextMenu = (
  id: string,
  disabled,
  subType: string,
  isLovedState,
  isDislikedState,
  inLibraryState
) => {
  let items = []
  if (subType.includes('curators')) {
    items = [ShareItem(id, 'curators'), PropertiesItem(id, 'curators')]
  } else if (subType.includes('stations')) {
    items = [
      LoveQuickItem(id, 'stations', disabled, isLovedState),
      DislikeQuickItem(id, 'stations', disabled, isDislikedState),
      ShareItem(id, 'stations'),
      PropertiesItem(id, 'stations')
    ]
  } else if (subType.includes('playlists')) {
    items = [
      AddToLibraryQuickItem(id, 'playlists', disabled, inLibraryState),
      LoveQuickItem(id, 'playlists', disabled, isLovedState),
      DislikeQuickItem(id, 'playlists', disabled, isDislikedState),
      PlayNextQuickItem(id, 'playlists'),
      PlayLastQuickItem(id, 'playlists'),
      AddToPlaylistItem(id, 'playlists'),
      ShuffleItem(id, 'playlists'),
      ShareItem(id, 'playlists'),
      PropertiesItem(id, 'playlists')
    ]
  } else {
    items = [
      AddToLibraryQuickItem(id, subType, disabled, inLibraryState),
      LoveQuickItem(id, subType, disabled, isLovedState),
      DislikeQuickItem(id, subType, disabled, isDislikedState),
      PlayNextQuickItem(id, subType),
      PlayLastQuickItem(id, subType),
      AddToPlaylistItem(id, subType),
      GoToArtistItem(id, subType),
      ShuffleItem(id, subType),
      ShareItem(id, subType),
      PropertiesItem(id, subType)
    ]
  }

  return items
}
