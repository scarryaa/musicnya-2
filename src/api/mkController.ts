import * as config from '../../config.json'
import { setStore, store } from '../stores/store'
import { Utils } from '../util/util'

export class mkController {
  static isInitialized: boolean
  static isErrored: boolean
  static isAuthorized: boolean

  static getInstance = async () => {
    if (!mkController.isInitialized) {
      console.log('Initializing MusicKit...')
      await MusicKit.configure({
        developerToken: config.MusicKit.token,
        app: {
          name: 'Music',
          build: '1.0.0'
        },
        sourceType: 24
      })
        .then(music => {
          music.authorize().then(() => {
            console.log('Authorized')
            mkController.isAuthorized = true
            mkController.setUpEvents()
            music.autoplayEnabled = store.app.queue.autoplay
            music._autoplayEnabled = store.app.queue.autoplay
          })

          config.MusicKit.musicUserToken = music.musicUserToken
        })
        .catch(e => {
          mkController.isInitialized = false
          mkController.isErrored = true
          console.error('Failed to initialize MusicKit: ', e)
        })
      mkController.isInitialized = true
    }
    return MusicKit.getInstance()
  }

  static authorize = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      try {
        await instance.authorize()
      } catch (e) {
        mkController.isErrored = true
        mkController.isAuthorized = false
        console.error('Failed to authorize: ', e)
      }
    } else {
      console.error('Failed to authorize: MusicKit instance not available')
    }
  }

  static setVolume = async (volume: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      try {
        if (volume > 100) {
          throw new Error('Volume cannot be greater than 100')
        }

        instance.volume = volume
      } catch (e) {
        console.error('Error setting volume: ', e)
      }
    } else {
      console.error('Failed to set volume: MusicKit instance not available')
    }
  }

  static playMediaItem = async (
    id: any,
    type: string,
    array = true,
    shouldShuffle = false
  ) => {
    const instance = await mkController.getInstance()

    try {
      const shouldStrip = type === 'stations'
      const isUploadedVideo = type === 'uploaded-videos'
      const isMusicVideo = type === 'music-videos'
      let strippedType = shouldStrip ? 'station' : type.replace('library-', '')

      if (isUploadedVideo) {
        strippedType = 'uploadedVideos'
        array = true
      }

      if (isMusicVideo) {
        strippedType = 'musicVideos'
        array = false
      }

      if (instance) {
        console.log('Playing media item: ', strippedType, id)
        instance.setQueue({
          [strippedType]: shouldStrip ? id : array ? [id] : id,
          startPlaying: type === 'stations' ? false : true,
          startWith: shouldShuffle ? Math.floor(Math.random() * 100) : 0
        })

        // special case for stations, since they don't start playing automatically for some reason
        if (type === 'stations') {
          instance.play()
        }

        if (!shouldShuffle) {
          instance.shuffleMode = 0
          setStore('shuffleMode', false)
        }
      } else {
        console.error('Failed to play media item: MusicKit instance not available')
      }
    } catch (error) {
      console.error('Error playing media item: ', error)
    }
  }

  static playNext = async (id: any, type: string) => {
    const instance = await mkController.getInstance()

    const shouldStrip = type === 'stations'
    const strippedType = shouldStrip ? 'station' : type.replace('library-', '')

    if (instance) {
      console.log('Playing next: ', strippedType, id)
      instance.playNext({
        [strippedType]: shouldStrip ? id : [id]
      })

      instance.shuffleMode = 0
    } else {
      console.error('Failed to play next: MusicKit instance not available')
    }
  }

  static playLater = async (id: any, type: string) => {
    const instance = await mkController.getInstance()

    const shouldStrip = type === 'stations'
    const strippedType = shouldStrip ? 'station' : type.replace('library-', '')

    if (instance) {
      console.log('Playing later: ', strippedType, id)
      instance.playLater({
        [strippedType]: shouldStrip ? id : [id]
      })

      instance.shuffleMode = 0
    } else {
      console.error('Failed to play later: MusicKit instance not available')
    }
  }

  static shufflePlayMediaItem = async (id: any, type: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      MusicKit.getInstance().shuffleMode = 1
      setStore('shuffleMode', true)
      this.playMediaItem(id, type, true, true)
    } else {
      console.error('Failed to play media item: MusicKit instance not available')
    }
  }

  static play = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.play()
    } else {
      console.error('Failed to play: MusicKit instance not available')
    }
  }

  static pause = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.pause()
    } else {
      console.error('Failed to pause: MusicKit instance not available')
    }
  }

  static stop = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.stop()
    } else {
      console.error('Failed to stop: MusicKit instance not available')
    }
  }

  static seekToTime = async (time: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.seekToTime(time)
    } else {
      console.error('Failed to seek: MusicKit instance not available')
    }
  }

  static skipToNextItem = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.skipToNextItem()
    } else {
      console.error('Failed to skip to next item: MusicKit instance not available')
    }
  }

  static skipToPreviousItem = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.skipToPreviousItem()
    } else {
      console.error('Failed to skip to previous item: MusicKit instance not available')
    }
  }

  static changeToMediaAtIndex = async (index: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.changeToMediaAtIndex(index)
    } else {
      console.error('Failed to change to media at index: MusicKit instance not available')
    }
  }

  static changeToMediaItem = async (item: any) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.changeToMediaItem(item)
    } else {
      console.error('Failed to change to media item: MusicKit instance not available')
    }
  }

  static getPlaybackDuration = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      if (instance.nowPlayingItem) {
        return instance.nowPlayingItem.attributes.durationInMillis
      } else {
        console.error('Failed to get playback duration: No now playing item')
      }
    } else {
      console.error('Failed to get playback duration: MusicKit instance not available')
    }
  }

  static getPlaybackProgress = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      return instance.currentPlaybackProgress
    } else {
      console.error('Failed to get playback progress: MusicKit instance not available')
    }
  }

  static toggleShuffleMode = async (shuffleMode: boolean) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.shuffleMode = shuffleMode ? 1 : 0
    } else {
      console.error('Failed to toggle shuffle mode: MusicKit instance not available')
    }
  }

  static toggleRepeatMode = async (repeatMode: boolean) => {
    const instance = await mkController.getInstance()
    if (instance) {
      // @ts-ignore
      instance.repeatMode = repeatMode ? 1 : 0
    } else {
      console.error('Failed to toggle repeat mode: MusicKit instance not available')
    }
  }

  static setQueue = async (id: any, type: string, index: number) => {
    const instance = await mkController.getInstance()
    instance.shuffleMode = 0
    if (instance) {
      instance.setQueue({ startWith: index, [type]: [id] }).then(() => {
        instance.play()
      })
    } else {
      console.error('Failed to set queue: MusicKit instance not available')
    }
  }

  static removeFromQueue = async (id: number) => {
    console.log('removing from queue: ', id)
    const instance = await mkController.getInstance()
    if (instance) {
      setStore('app', 'queue', {
        items: store.app.queue.items.filter((item: any) => item.id !== id)
      })
      instance.queue._queueItems = instance.queue._queueItems.filter(
        (item: any) => item.item.id !== id
      )

      instance.queue._reindex()
    } else {
      console.error('Failed to remove from queue: MusicKit instance not available')
    }
  }

  // api

  static getLyrics = async (id: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/catalog/us/songs/${id}/lyrics?l=en-US&platform=web`,
        {
          headers: {
            authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
            'music-user-token': MusicKit.getInstance().musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to get lyrics: MusicKit instance not available')
    }
  }

  static checkIfArtistIsFavorite = async (id: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/favorites?l=en-US&platform=web&ids[artists]=${id}`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          cache: 'no-cache'
        }
      )
      return response.json()
    } else {
      console.error(
        'Failed to check if artist is favorite: MusicKit instance not available'
      )
    }
  }

  static favoriteArtist = async (id: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/favorites?l=en-US&platform=web&art[url]=f&ids[artists]=${id}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response
    } else {
      console.error('Failed to toggle artist favorite: MusicKit instance not available')
    }
  }

  static setStationQueue = async (id: string, type: string) => {
    const instance = await mkController.getInstance()

    const strippedType = type.substring(0, type.length - 1)
    if (instance) {
      instance.setStationQueue({ [strippedType]: [id] }).then(() => {
        instance.play()
      })
    } else {
      console.error('Failed to set station queue: MusicKit instance not available')
    }
  }

  static clearQueue = async () => {
    const instance = await mkController.getInstance()

    if (instance) {
      instance.clearQueue()
    } else {
      console.error('Failed to clear queue: MusicKit instance not available')
    }
  }

  static moveQueueItem = async (from: number, to: number) => {
    const instance = await mkController.getInstance()

    if (instance) {
      instance.queue._queueItems.splice(
        to,
        0,
        instance.queue._queueItems.splice(from, 1)[0]
      )
      instance.queue._reindex()

      setStore('app', 'queue', {
        items: instance.queue.items
      })
    } else {
      console.error('Failed to move queue item: MusicKit instance not available')
    }
  }

  static unfavoriteArtist = async (id: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/favorites?l=en-US&platform=web&ids[artists]=${id}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response
    } else {
      console.error('Failed to toggle artist favorite: MusicKit instance not available')
    }
  }

  static addToLibrary = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    type = type.replace('library-', '')

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library?ids[${type}]=${id}`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response
    } else {
      console.error('Failed to add to library: MusicKit instance not available')
    }
  }

  static removeFromLibrary = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    type = type.replace('library-', '')

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library/${type}/${id}?l=en-US&platform=web`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response
    } else {
      console.error('Failed to remove from library: MusicKit instance not available')
    }
  }

  static addTrackToPlaylist = async (id: string, type: string, playlistID: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library/playlists/${playlistID}/tracks?l=en-US&platform=web`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          body: JSON.stringify({
            data: [
              {
                id,
                type: strippedType
              }
            ]
          })
        }
      )
      return response
    } else {
      console.error('Failed to add track to playlist: MusicKit instance not available')
    }
  }

  static addToPlaylist = async (id: string, type: string, playlistID: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')

    if (instance) {
      if (type === 'songs') {
        const response = await fetch(
          `https://amp-api.music.apple.com/v1/me/library/playlists/${playlistID}/tracks?l=en-US&platform=web`,
          {
            method: 'POST',
            headers: {
              authorization: `Bearer ${config.MusicKit.token}`,
              'music-user-token': config.MusicKit.musicUserToken
            },
            body: JSON.stringify({
              data: [
                {
                  id,
                  type: strippedType
                }
              ]
            })
          }
        )
        return response
      }

      const tracks = await fetch(
        type.includes('library-')
          ? `https://amp-api.music.apple.com/v1/me/library/${strippedType}/${id}/tracks?l=en-US&platform=web&limit=100`
          : `https://amp-api.music.apple.com/v1/catalog/us/${strippedType}/${id}/tracks?l=en-US&platform=web&limit=100`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      ).then(response => response.json())

      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library/playlists/${playlistID}/tracks?l=en-US&platform=web`,
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          body: JSON.stringify({
            data: tracks.data.map((track: any) => {
              return {
                id: track.id,
                type: track.type
              }
            })
          })
        }
      )
      return response
    } else {
      console.error('Failed to add to playlist: MusicKit instance not available')
    }
  }

  static checkIfInLibrary = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    type = type.replace('library-', '')

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/catalog/us?l=en-US&platform=web&omit[resource]=autos&relate=library&fields=inLibrary&ids[${type}]=${id}`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          cache: 'no-cache'
        }
      )
      return response.json()
    } else {
      console.error('Failed to check if in library: MusicKit instance not available')
    }
  }

  static checkIfLoved = async (id: string, type: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/ratings/${type}?ids=${id}`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to check if loved: MusicKit instance not available')
    }
  }

  static getShareLink = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')

    if (instance) {
      try {
        const response = await fetch(
          type.includes('library-')
            ? `https://amp-api.music.apple.com/v1/me/library/${strippedType}/${id}/catalog?fields=url`
            : `https://amp-api.music.apple.com/v1/catalog/us/${type}/${id}?l=en-US&platform=web&fields=url`,
          {
            headers: {
              authorization: `Bearer ${config.MusicKit.token}`,
              'music-user-token': config.MusicKit.musicUserToken
            }
          }
        )
        return response.json()
      } catch (error) {
        console.error('Error fetching share link: ', error)
      }
    } else {
      console.error('Failed to get share link: MusicKit instance not available')
    }
  }

  static unlove = async (id: string, type: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/ratings/${type}/${id}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
            'music-user-token': MusicKit.getInstance().musicUserToken
          }
        }
      )
      return response
    } else {
      console.error('Failed to unlove: MusicKit instance not available')
    }
  }

  static dislike = async (id: string, type: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/ratings/${type}/${id}`,
        {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          body: JSON.stringify({
            attributes: {
              value: -1
            }
          })
        }
      )
      return response
    } else {
      console.error('Failed to dislike: MusicKit instance not available')
    }
  }

  static love = async (id: string, type: string) => {
    const instance = await mkController.getInstance()

    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/ratings/${type}/${id}`,
        {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          },
          body: JSON.stringify({
            attributes: {
              value: 1
            }
          })
        }
      )
      return response
    } else {
      console.error('Failed to love: MusicKit instance not available')
    }
  }

  static getAlbumFromMediaItem = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')
    if (instance) {
      const response = await fetch(
        type.includes('library-')
          ? `https://amp-api.music.apple.com/v1/me/library/${strippedType}/${id}/albums?l=en-US&platform=web&fields=url,artwork,name`
          : `https://amp-api.music.apple.com/v1/catalog/us/${strippedType}/${id}/albums?l=en-US&platform=web&fields=url,artwork,name`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      ).then(response => response.json())

      if (type.includes('library-')) {
        const response2 = await fetch(
          `https://amp-api.music.apple.com/v1/me/library/albums/${response.data[0].id}/catalog?l=en-US&platform=web&fields=url`,
          {
            headers: {
              authorization: `Bearer ${config.MusicKit.token}`,
              'music-user-token': config.MusicKit.musicUserToken
            }
          }
        )

        return response2.json()
      }

      return response
    } else {
      console.error('Failed to get album: MusicKit instance not available')
    }
  }

  static getArtistFromMediaItem = async (id: string, type: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')
    if (instance) {
      const response = await fetch(
        type.includes('library-')
          ? `https://amp-api.music.apple.com/v1/me/library/${strippedType}/${id}/artists?l=en-US&platform=web&fields=url,artwork,name`
          : `https://amp-api.music.apple.com/v1/catalog/us/${strippedType}/${id}/artists?l=en-US&platform=web&fields=url,artwork,name`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      ).then(response => response.json())

      if (type.includes('library-')) {
        const response2 = await fetch(
          `https://amp-api.music.apple.com/v1/me/library/artists/${response.data[0].id}/catalog?l=en-US&platform=web&fields=url`,
          {
            headers: {
              authorization: `Bearer ${config.MusicKit.token}`,
              'music-user-token': config.MusicKit.musicUserToken
            }
          }
        )

        return response2.json()
      }

      return response
    } else {
      console.error('Failed to get artist: MusicKit instance not available')
    }
  }

  static fetchMoreTracks = async (id: string, type: string, offset: number) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')

    if (instance) {
      const response = await fetch(
        type.includes('library-')
          ? `https://amp-api.music.apple.com/v1/me/library/playlists/${id}/tracks?offset=${offset}&l=en-US&platform=web&limit=100&include=albums,catalog`
          : `https://amp-api.music.apple.com/v1/catalog/us/playlists/${id}/tracks?offset=${offset}&l=en-US&platform=web&limit=100&include=artists`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to fetch more tracks: MusicKit instance not available')
    }
  }

  static getRecentlyAdded = async (offset: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library/recently-added?l=en-US&platform=web&extend=artistUrl&limit=25&art%5Bf%5D=url&include=catalog&offset=${offset}`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to get recently added: MusicKit instance not available')
    }
  }

  static getAlbums = async (offset: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/me/library/albums?l=en-US&platform=web&extend=artistUrl&limit=100&art%5Bf%5D=url&include=catalog&offset=${offset}`,
        {
          headers: {
            authorization: `Bearer ${config.MusicKit.token}`,
            'music-user-token': config.MusicKit.musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to get albums: MusicKit instance not available')
    }
  }

  static getArtist = async (id: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      const response = await fetch(
        `https://amp-api.music.apple.com/v1/catalog/${store.countryCode}/artists/${id}?l=en-US&platform=web&views=featured-release,full-albums,appears-on-albums,featured-albums,featured-on-albums,singles,compilation-albums,live-albums,latest-release,top-music-videos,similar-artists,top-songs,playlists,more-to-see&extend=centeredFullscreenBackground,artistBio,bornOrFormed,editorialArtwork,editorialVideo,isGroup,origin,inFavorites,hero&extend[playlists]=trackCount&include[songs]=albums&fields[albums]=artistName,artistUrl,artwork,contentRating,editorialArtwork,editorialVideo,name,playParams,releaseDate,url,trackCount&limit[artists:top-songs]=20&art[url]=f`,
        {
          headers: {
            authorization: `Bearer ${MusicKit.getInstance().developerToken}`,
            'music-user-token': MusicKit.getInstance().musicUserToken
          }
        }
      )
      return response.json()
    } else {
      console.error('Failed to get artist: MusicKit instance not available')
    }
  }

  static toggleAutoplay = async (autoplay: boolean) => {
    const instance = await mkController.getInstance()
    if (instance) {
      setStore('app', 'queue', 'autoplay', autoplay)
      instance.autoplayEnabled = autoplay
      instance._autoplayEnabled = autoplay
      console.log(instance.autoplayEnabled)
    } else {
      console.error('Failed to toggle autoplay: MusicKit instance not available')
    }
  }

  static changeToIndex = async (index: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.changeToMediaAtIndex(index)
    } else {
      console.error('Failed to change to index: MusicKit instance not available')
    }
  }

  static setUpEvents = () => {
    MusicKit.getInstance().addEventListener('mediaItemStateDidChange', async e => {
      const rawLyricsData = await this.getLyrics(e.id).then((response: any) => {
        return response.data[0].attributes.ttml
      })

      setStore('currentTrack', {
        id: e.id,
        title: e.attributes.name,
        artist: e.attributes.artistName,
        album: e.attributes.albumName,
        artwork: e.attributes.artwork.url,
        type: e.type,
        parentType: e.container.type,
        parentID: e.container.id,
        lyrics: {
          lyricsArray: Utils.parseTTMLtoJS(rawLyricsData),
          writtenByArray: Utils.stripWrittenBy(rawLyricsData),
          begin: Utils.getLyricsBeginning(rawLyricsData)
        }
      })
    })

    MusicKit.getInstance().addEventListener('nowPlayingItemDidChange', e => {
      setStore('app', 'queue', {
        index: MusicKit.getInstance().queue.position,
        nextUpIndex: MusicKit.getInstance().queue.position + 1,
        remainingStartIndex: MusicKit.getInstance().queue.position + 1
      })
    })

    MusicKit.getInstance().addEventListener('queueItemsDidChange', e => {
      setStore('app', 'queue', {
        items: e,
        index: store.app.queue.index,
        nextUpIndex: MusicKit.getInstance().queue.position + 1,
        remainingStartIndex: store.app.queue.remainingStartIndex
      })
    })

    MusicKit.getInstance().addEventListener('playbackStateDidChange', e => {
      setStore('isPlaying', e.state === 2)
      setStore('isPaused', e.state === 3)
      setStore('isStopped', e.state === 0)
    })

    MusicKit.getInstance().addEventListener('playbackDurationDidChange', e => {
      setStore('duration', e.duration)
    })

    MusicKit.getInstance().addEventListener('playbackProgressDidChange', e => {
      setStore('progress', e.progress * 100)
    })

    MusicKit.getInstance().addEventListener('playbackTimeDidChange', e => {
      setStore('currentTime', e.currentPlaybackTime)
    })

    MusicKit.getInstance().addEventListener('shuffleModeDidChange', e => {
      setStore('shuffleMode', e.shuffleMode === 1)
    })
  }

  static getTracksForPlaylist = async (id: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      return await instance.api.v3.music(`v1/me/library/playlists/${id}/tracks`, {
        limit: 100,
        include: 'catalog,artists'
      })
    } else {
      console.error('Failed to get tracks for playlist: MusicKit instance not available')
    }
  }

  static getPlaylists = async () => {
    const instance = await mkController.getInstance()
    if (instance) {
      return await instance.api.v3.music('v1/me/library/playlists', {
        limit: 100,
        include: 'catalog,artists,[tracks]=artists'
      })
    } else {
      console.error('Failed to get playlists: MusicKit instance not available')
    }
  }
}
