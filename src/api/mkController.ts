import * as config from '../../config.json'
import { setStore } from '../stores/store'

export class mkController {
  static isInitialized: boolean
  static isErrored: boolean

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
            mkController.setUpEvents()
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
      await instance.authorize()
    } else {
      console.error('Failed to authorize: MusicKit instance not available')
    }
  }

  static setVolume = async (volume: number) => {
    const instance = await mkController.getInstance()
    if (instance) {
      instance.volume = volume
    } else {
      console.error('Failed to set volume: MusicKit instance not available')
    }
  }

  static playMediaItem = async (id: any, type: string) => {
    const instance = await mkController.getInstance()

    const shouldStrip = type === 'stations'
    const strippedType = shouldStrip ? 'station' : type.replace('library-', '')

    if (instance) {
      console.log('Playing media item: ', strippedType, id)
      instance.setQueue({
        [strippedType]: shouldStrip ? id : [id],
        startPlaying: type === 'stations' ? false : true
      })

      // special case for stations, since they don't start playing automatically for some reason
      if (type === 'stations') {
        instance.play()
      }

      instance.shuffleMode = 0
    } else {
      console.error('Failed to play media item: MusicKit instance not available')
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
      instance.shuffleMode = 1
      this.playMediaItem(id, type)
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
    if (instance) {
      instance.setQueue({ startWith: index, [type]: [id] }).then(() => {
        instance.play()
      })
    } else {
      console.error('Failed to set queue: MusicKit instance not available')
    }
  }

  // api

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

  static addToPlaylist = async (id: string, type: string, playlistID: string) => {
    const instance = await mkController.getInstance()
    const strippedType = type.replace('library-', '')

    if (instance) {
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
          : `https://amp-api.music.apple.com/v1/catalog/us/${strippedType}/${id}/tracks?offset=${offset}&l=en-US&platform=web&limit=100&art[url]=f&extend=editorialArtwork,editorialVideo,extendedAssetUrls,offers&fields[artists]=name,url&fields[curators]=name&fields[record-labels]=name,url&include=record-labels,artists&include[music-videos]=artists&include=albums,catalog&include[playlists]=curator&include[songs]=artists,composers,albums&l=en-US&meta[albums:tracks]=popularity&platform=web&views=appears-on,audio-extras,more-by-artist,other-versions,related-videos,video-extras,you-might-also-like`,
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

  static setUpEvents = () => {
    MusicKit.getInstance().addEventListener('mediaItemStateDidChange', e => {
      console.log(e)
      setStore('currentTrack', {
        id: e.id,
        title: e.attributes.name,
        artist: e.attributes.artistName,
        album: e.attributes.albumName,
        artwork: e.attributes.artwork.url,
        type: e.type,
        parentType: e.container.type,
        parentID: e.container.id
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
  }

  static getTracksForPlaylist = async (id: string) => {
    const instance = await mkController.getInstance()
    if (instance) {
      return await instance.api.v3.music(`v1/me/library/playlists/${id}/tracks`, {
        limit: 100,
        include: 'albums,catalog'
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
        include: 'catalog'
      })
    } else {
      console.error('Failed to get playlists: MusicKit instance not available')
    }
  }
}
