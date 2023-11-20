import { render } from 'solid-js/web'

import App from './App'
import './index.scss'
import { Route, Router, Routes } from '@solidjs/router'
import { Home } from './pages/Home/Home'
import { Browse } from './pages/Browse/Browse'
import { Radio } from './pages/Radio/Radio'
import { Settings } from './pages/Settings/Settings'
import { ListenNow } from './pages/ListenNow/ListenNow'
import { Album } from './pages/Media/Album/Album'
import { LibraryAlbum } from './pages/Media/LibraryAlbum/LibraryAlbum'
import { Playlist } from './pages/Media/Playlist/Playlist'
import { LibraryPlaylist } from './pages/Media/LibraryPlaylist/LibraryPlaylist'
import { Station } from './pages/Media/Station/Station'
import { Search } from './pages/Search/Search'
import { Video } from './pages/Media/Video/Video'
import { NotFound } from './components/NotFound/NotFound'
import { RecentlyAdded } from './pages/RecentlyAdded/RecentlyAdded'
import { Albums } from './pages/Albums/Albums'
import { Artist } from './pages/Media/Artist/Artist'
import { Playlists } from './pages/Playlists/Playlists'
import { Artists } from './pages/Artists/Artists'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  )
}

render(
  () => (
    <Router>
      <Routes>
        <Route path="/" component={App}>
          <Route path="/home" component={Home} />
          <Route path="/listen" component={ListenNow} />
          <Route path="/browse" component={Browse} />
          <Route path="/radio" component={Radio} />
          <Route path="/settings" component={Settings} />
          <Route path="/media/albums/:id" component={Album} />
          <Route path="/media/library-albums/:id" component={LibraryAlbum} />
          <Route path="/media/playlists/:id" component={Playlist} />
          <Route path="/media/library-playlists/:id" component={LibraryPlaylist} />
          <Route path="/media/stations/:id" component={Station} />
          <Route path="/media/videos/:id" component={Video} />
          <Route path="media/artists/:id" component={Artist} />
          <Route path="/search" component={Search} />
          <Route path="/recent" component={RecentlyAdded} />
          <Route path="/albums" component={Albums} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/artists" component={Artists} />
          <Route path="*" component={NotFound} />
        </Route>
      </Routes>
    </Router>
  ),
  root!
)
