import { LocalStoragePreset } from 'lowdb/browser'
import { Utils } from '../util/util'
import { setStore, store } from '../stores/store'

const defaultData = { songs: [] }
export const dbName = 'db.json'

type Entry = {
  songs: Array<{
    id: string
    title: string
    artist: string
    playCount: number
  }>
}

export const initDB = async () => {
  const db = await LocalStoragePreset<Entry>(dbName, defaultData)
}

export const getDB = async () => {
  const db = await LocalStoragePreset<Entry>(dbName, defaultData)
  return db
}

export const addSong = async (song: {
  id: string
  title: string
  artist: string
  playCount: number
}) => {
  const db = await LocalStoragePreset<Entry>(dbName, defaultData)
  db.data.songs.push(song)
  await db.write()
}

export const increasePlayCount = async (song: {
  id: string
  title: string
  artist: string
  playCount: number
}) => {
  getDB().then(db => {
    const index = db.data.songs.findIndex(s => s.id === song.id)
    if (index === -1) {
      addSong(song)
      return
    }

    db.data.songs[index].playCount++
    db.write()
  })
}
