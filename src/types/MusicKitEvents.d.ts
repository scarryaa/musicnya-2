interface PlaybackStateDidChangeEvent {
  oldState: number
  state: number
  nowPlayingItem: MusicKit.MediaItem
}

interface PlaybackDurwtionDidChange {
  duration: number
  isTrusted: boolean
  timeStamp: number
  bubbles: boolean
  cancelBubble: boolean
  cancelable: boolean
  composed: boolean
  defaultPrevented: boolean
  eventPhase: number
}

interface PlaybackProgressDidChange {
  progress: number
}

interface PlaybackTimeDidChange {
  currentPlaybackTime: number
}
