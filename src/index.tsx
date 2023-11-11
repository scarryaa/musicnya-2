import { render } from 'solid-js/web'

import App from './App'
import './index.scss'
import { Route, Router, Routes } from '@solidjs/router'
import { Home } from './pages/Home/Home'
import { Browse } from './pages/Browse/Browse'
import { Radio } from './pages/Radio/Radio'

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
          <Route path="/" component={Home} />
          <Route path="/browse" component={Browse} />
          <Route path="/radio" component={Radio} />
        </Route>
      </Routes>
    </Router>
  ),
  root!
)
