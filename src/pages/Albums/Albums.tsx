import { createSignal, createEffect, onCleanup, Switch, Match, For } from 'solid-js'
import { mkController } from '../../api/mkController'
import { MediaItem } from '../../components/MediaItem/MediaItem'
import { Utils } from '../../util/util'
import styles from './Albums.module.scss'
import musicNote from '../../assets/music_note.png'
import { MediaItemSkeleton } from '../../components/Skeletons/MediaItemSkeleton'
import { ArtistListSkeleton } from '../../components/Skeletons/ArtistListSkeleton'

export const Albums = () => {
  return <ArtistListSkeleton />
}
